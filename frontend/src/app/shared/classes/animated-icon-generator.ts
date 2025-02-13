import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


interface Shapes {
    [key: string]: string //key=path-id of one svg,value=path-points
}
interface KeyframesOfShapes {
    [key: string]: string[] //key=path-id, value=path-points over time
}
export class AnimatedIconGenerator {

    //injections
    private sanitizer: DomSanitizer = inject(DomSanitizer);
    private httpClient: HttpClient = inject(HttpClient);

    //data
    private baseFileName: string = '';
    private keyframeCount: number = 0;
    /*
    private resultSVG: string = `
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
    <path d="M69.4675 75.3173C79.3178 70.5768 102.314 58.6642 107.37 48.1816C113.501 35.4681 108.187 20.1919 95.5065 14.0767C82.8259 7.96143 67.5635 13.3147 61.4324 26.0282C56.3771 36.5108 61.3736 61.9231 63.7972 72.5827C64.3836 75.1274 67.1111 76.4428 69.4675 75.3173ZM88.1028 29.4288C90.1334 30.4081 91.6908 32.1559 92.4324 34.2879C93.1739 36.4199 93.039 38.7613 92.0572 40.7971C91.0755 42.8329 89.3272 44.3964 87.1972 45.1435C85.0672 45.8906 82.7298 45.7602 80.6992 44.781C78.6687 43.8017 77.1113 42.0539 76.3697 39.9219C75.6281 37.7899 75.763 35.4485 76.7448 33.4127C77.7266 31.3768 79.4748 29.8134 81.6049 29.0663C83.7349 28.3192 86.0723 28.4496 88.1028 29.4288Z"/>
    </svg>
    `
    */

    constructor(baseFileName: string, keyframeCount: number) {
        this.baseFileName = baseFileName;
        this.keyframeCount = keyframeCount;
    }

    public generateAnimatedIcon(keyframePositions: number[]): Promise<SafeHtml> {
        return new Promise((resolve, reject) => {
            this.loadRawSVGS().then((rawSVGs: string[]) => {
                const extractedPathData: Shapes[] = this.extractShapeData(rawSVGs);
                const resultSVG = this.generateAnimatedSVG(extractedPathData, keyframePositions);
                resolve(this.sanitizer.bypassSecurityTrustHtml(resultSVG));
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
            const path: string = `<path id="${id}" />`
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
            const matches = rawSVG.match(/<path[^>]+d="[^"]+"[^>]*>/);
            shapes[i] = {};
            matches?.forEach((path: string) => {
                const shapeId = path.match(/id="([^"]+)"/);
                const shapePoints = path.match(/\bd="([^"]+)"/);
                if (shapeId && shapePoints) {
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