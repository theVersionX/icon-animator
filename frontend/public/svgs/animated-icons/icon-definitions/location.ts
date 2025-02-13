import { AnimatedIconDefinition } from "../../../../src/app/shared/interfaces/animated-icon-definition";

export const LOCATION_ICON_DEFINITION: AnimatedIconDefinition = {
  icon: `
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
                <style>

                  @keyframes locationPathAnimation {
                  0% {
                    d: path('M66.6476 96.472C73.4609 87.9233 89 67.2041 89 55.5662C89 41.4515 77.5781 30 63.5 30C49.4219 30 38 41.4515 38 55.5662C38 67.2041 53.5391 87.9233 60.3524 96.472C61.9859 98.5093 65.0141 98.5093 66.6476 96.472ZM63.5 47.0441C65.7543 47.0441 67.9163 47.942 69.5104 49.5402C71.1045 51.1384 72 53.306 72 55.5662C72 57.8264 71.1045 59.994 69.5104 61.5922C67.9163 63.1904 65.7543 64.0882 63.5 64.0882C61.2457 64.0882 59.0837 63.1904 57.4896 61.5922C55.8955 59.994 55 57.8264 55 55.5662C55 53.306 55.8955 51.1384 57.4896 49.5402C59.0837 47.942 61.2457 47.0441 63.5 47.0441Z');
                    }
                
                  50% {
                    d: path('M69.4675 75.3173C79.3178 70.5768 102.314 58.6642 107.37 48.1816C113.501 35.4681 108.187 20.1919 95.5065 14.0767C82.8259 7.96143 67.5635 13.3147 61.4324 26.0282C56.3771 36.5108 61.3736 61.9231 63.7972 72.5827C64.3836 75.1274 67.1111 76.4428 69.4675 75.3173ZM88.1028 29.4288C90.1334 30.4081 91.6908 32.1559 92.4324 34.2879C93.1739 36.4199 93.039 38.7613 92.0572 40.7971C91.0755 42.8329 89.3272 44.3964 87.1972 45.1435C85.0672 45.8906 82.7298 45.7602 80.6992 44.781C78.6687 43.8017 77.1113 42.0539 76.3697 39.9219C75.6281 37.7899 75.763 35.4485 76.7448 33.4127C77.7266 31.3768 79.4748 29.8134 81.6049 29.0663C83.7349 28.3192 86.0723 28.4496 88.1028 29.4288Z');
                    }
                
                  100% {
                    d: path('M66.6476 96.472C73.4609 87.9233 89 67.2041 89 55.5662C89 41.4515 77.5781 30 63.5 30C49.4219 30 38 41.4515 38 55.5662C38 67.2041 53.5391 87.9233 60.3524 96.472C61.9859 98.5093 65.0141 98.5093 66.6476 96.472ZM63.5 47.0441C65.7543 47.0441 67.9163 47.942 69.5104 49.5402C71.1045 51.1384 72 53.306 72 55.5662C72 57.8264 71.1045 59.994 69.5104 61.5922C67.9163 63.1904 65.7543 64.0882 63.5 64.0882C61.2457 64.0882 59.0837 63.1904 57.4896 61.5922C55.8955 59.994 55 57.8264 55 55.5662C55 53.306 55.8955 51.1384 57.4896 49.5402C59.0837 47.942 61.2457 47.0441 63.5 47.0441Z');
                    }
                
            }
            
                  
                  @keyframes rectangleAnimation {
                  0% {
                    d: path('M117.5 87.5H86.5V116.5H117.5V87.5Z');
                    }
                
                  50% {
                    d: path('M43 71H12V118H43V71Z');
                    }
                
                  100% {
                    d: path('M120 92H89V121H120V92Z');
                    }
                
            }

            
                #locationPath {
                animation: locationPathAnimation 4s infinite;
                }
            
            
                #rectangle {
                animation: rectangleAnimation 4s infinite;
                }
            
                </style>
                
            <path id="locationPath" />
            <path id="rectangle" />
            </svg>
        `
}