import { inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export class AnimatedIconGenerator {

    //injections
    private sanitizer: DomSanitizer = inject(DomSanitizer);

    //data
    resultSVG: string = `
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
    <path d="M69.4675 75.3173C79.3178 70.5768 102.314 58.6642 107.37 48.1816C113.501 35.4681 108.187 20.1919 95.5065 14.0767C82.8259 7.96143 67.5635 13.3147 61.4324 26.0282C56.3771 36.5108 61.3736 61.9231 63.7972 72.5827C64.3836 75.1274 67.1111 76.4428 69.4675 75.3173ZM88.1028 29.4288C90.1334 30.4081 91.6908 32.1559 92.4324 34.2879C93.1739 36.4199 93.039 38.7613 92.0572 40.7971C91.0755 42.8329 89.3272 44.3964 87.1972 45.1435C85.0672 45.8906 82.7298 45.7602 80.6992 44.781C78.6687 43.8017 77.1113 42.0539 76.3697 39.9219C75.6281 37.7899 75.763 35.4485 76.7448 33.4127C77.7266 31.3768 79.4748 29.8134 81.6049 29.0663C83.7349 28.3192 86.0723 28.4496 88.1028 29.4288Z"/>
    </svg>
    `

    public generateAnimatedIcon(): SafeHtml {

        return this.sanitizer.bypassSecurityTrustHtml(this.resultSVG)
    }

    private loadRawSVGS(): string[] {
        let rawSVGS: string[] = []

        

        return rawSVGS;
    }

}