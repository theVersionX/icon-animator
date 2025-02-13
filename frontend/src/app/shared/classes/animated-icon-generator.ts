import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


interface Shapes {
    [key: string]: string //key=path-id of one svg,value=path-points
}
interface KeyframesOfShapes {
    [key: string]: string[] //key=path-id, value=path-points over time
}

/**
 * @description this class creates an animated svg from multiple svgs. 
 * - svg size has to be 128x128
 * - only path shapes are allowed
 * - pahts must have an id (in figma use the three dots right to the export button to export svgs with ids)
 * - every svg should contain the same paths. 
 */
export class AnimatedIconGenerator {

    //injections
    private httpClient: HttpClient = inject(HttpClient);

    //data
    private baseFileName: string = '';
    private keyframeCount: number = 0;

    constructor(baseFileName: string, keyframeCount: number) {
        this.baseFileName = baseFileName;
        this.keyframeCount = keyframeCount;
    }

    public generateAnimatedIcon(keyframePositions: number[]): Promise<string> {
        return new Promise((resolve, reject) => {
            this.loadRawSVGS().then((rawSVGs: string[]) => {
                const extractedPathData: Shapes[] = this.extractShapeData(rawSVGs);
                const resultSVG = this.generateAnimatedSVG(extractedPathData, keyframePositions);
                resolve(resultSVG);
            });
        });
    }

    private generateAnimatedSVG(extractedPathData: Shapes[], keyframePositions: number[]): string {

        const allIds: string[] = this.getAllShapeIds(extractedPathData);
        const shapesWithKeyframes: KeyframesOfShapes = this.getShapesWithKeyframes(extractedPathData);

        //animations
        let allAnimations: string = '';
        Object.keys(shapesWithKeyframes).forEach((pathKey) => {
            const keyfames: string[] = shapesWithKeyframes[pathKey];
            let animation = `@keyframes ${pathKey}Animation {`
            keyfames.forEach((keyframe, keyframeInd) => {
                animation = `
                  ${animation}
                  ${keyframePositions[keyframeInd]}% {
                    d: path('${keyframe}');
                    }
                `
            });
            animation = `${animation}
            }`
            allAnimations = `${allAnimations}
            ${animation}`
        });

        //shapes
        let allShapes: string = '';
        allIds.forEach((id) => {
            const path: string = `<path id="${id}" d="${shapesWithKeyframes[id][0]}" />`
            allShapes = `${allShapes}
            ${path}`
        });

        //classes

        let allClasses: string = '';
        allIds.forEach((id) => {
            const newClass: string = `
                #${id} {
                animation: ${id}Animation 4s infinite;
                }
            `
            allClasses = `${allClasses}
            ${newClass}`
        });


        let animatedSVG: string = `
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
                <style>
                    ${allAnimations}

                    ${allClasses}
                </style>
                ${allShapes}
            </svg>
        `;
        return animatedSVG;
    }

    /**
    * @description shapesWithKeyframes holds shapes and associated keyframes.
    *              eg: {
    *                  path1:[path1-points1, path1-points2, path1-points3],
    *                  path2:[path2-points1, path2-points2, path2-points3]
    *                  ...  
    *                  }
    */
    private getShapesWithKeyframes(extractedShapeData: Shapes[]): KeyframesOfShapes {
        const shapesWithKeyframes: KeyframesOfShapes = {};
        this.getAllShapeIds(extractedShapeData).forEach((id) => {
            if (shapesWithKeyframes[id] === undefined) {
                shapesWithKeyframes[id] = [];
            }
            shapesWithKeyframes[id] = extractedShapeData.map((shapeData) => shapeData[id])
        });
        return shapesWithKeyframes;
    }

    private getAllShapeIds(extractedShapeData: Shapes[]): string[] {
        return Object.keys(extractedShapeData[0]);
    }

    private extractShapeData(rawSVGs: string[]): Shapes[] {
        let shapes: Shapes[] = [];
        rawSVGs.forEach((rawSVG: string, i: number) => {
            const matches = rawSVG.match(/<path[^>]+d="[^"]+"[^>]*>/g);
            matches?.forEach((path: string) => {
                const shapeId = path.match(/id="([^"]+)"/);
                const shapePoints = path.match(/\bd="([^"]+)"/);
                if (shapeId && shapePoints) {
                    if (shapes[i] === undefined) {
                        shapes[i] = {}
                    }
                    shapes[i][shapeId?.at(1) || ''] = shapePoints?.at(1) || '';
                }
            })
        });
        return shapes;
    }


    private loadRawSVGS(): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            let rawSVGs: string[] = []

            for (let i = 0; i < this.keyframeCount; i++) {
                this.httpClient
                    .get(`svgs/animated-icons/src/${this.baseFileName}/${this.baseFileName}-${i}.svg`, { responseType: 'text' })
                    .subscribe(value => {
                        rawSVGs[i] = value;
                        if (rawSVGs.length === this.keyframeCount) {
                            resolve(rawSVGs)
                        }
                    });
            }
        });
    }

}