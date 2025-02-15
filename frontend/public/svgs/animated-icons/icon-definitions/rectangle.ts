export const RECTANGLE_ANIMATED_ICON_DEFINITION = {
  icon: `
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
                <style>
                    
            
                  
                  
                  @keyframes rectangle1Animation {
                  0% {
                    d: path('M80 59H49V88H80V59Z');
                    }
                
                  50% {
                    d: path('M80 29L17.5 34L74 45.5L112 108.5L80 29Z');
                    }
                
                  100% {
                    d: path('M80 59H49V88H80V59Z');
                    }
                
            }
            
                  
                  
                  @keyframes rectangle2Animation {
                  0% {
                    d: path('M65 15H34V44H65V15Z');
                    }
                
                  50% {
                    d: path('M75 69H44V98H75V69Z');
                    }
                
                  100% {
                    d: path('M65 15H34V44H65V15Z');
                    }
                
            }

                    
            
                .rectangle1 {
                animation: rectangle1AnimationPlaceholder;
                }
            
            
                .rectangle2 {
                animation: rectangle2AnimationPlaceholder;
                }
            
                </style>
                
            <path class="rectangle1" d="M80 59H49V88H80V59Z" />
            <path class="rectangle2" d="M65 15H34V44H65V15Z" />
            </svg>
        `,
  shapeIds: [`rectangle1`, `rectangle2`]
};