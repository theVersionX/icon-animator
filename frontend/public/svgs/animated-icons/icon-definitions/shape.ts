export const SHAPE_ANIMATED_ICON_DEFINITION = {
  icon: `
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 128 128">
                <style>
                    
            
                  
                  
                  @keyframes shapeAnimation {
                  0% {
                    d: path('M19 28.5L34 98.5L72.5 86L80 42L19 28.5Z');
                    }
                
                  88.53383458646617% {
                    d: path('M7 11L15.5 118.5L98.5 114.5L87.5 51.5L7 11Z');
                    }
                
                  100% {
                    d: path('M19 28.5L34 98.5L72.5 86L80 42L19 28.5Z');
                    }
                
            }

                    
            
                .shape {
                animation: shapeAnimationPlaceholder;
                }
            
                </style>
                
            <path class="shape" d="M19 28.5L34 98.5L72.5 86L80 42L19 28.5Z" />
            </svg>
        `,
  shapeIds: [`shape`]
};