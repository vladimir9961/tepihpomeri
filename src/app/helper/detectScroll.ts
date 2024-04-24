export function handleScroll(previousScrollPosition: number, isBottomNavFixed: boolean, isScrolledToTop: boolean): { isBottomNavFixed: boolean, isScrolledToTop: boolean, previousScrollPosition: number } {
    if (typeof window !== 'undefined') {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      if (currentScrollPosition > previousScrollPosition) {
        isBottomNavFixed = true;
        isScrolledToTop = true;
      } else if (currentScrollPosition < previousScrollPosition) {
        if (currentScrollPosition === 0) {
          isScrolledToTop = false;
        }
        isBottomNavFixed = false;
      }
  
      previousScrollPosition = currentScrollPosition;
    }
  
    return { isBottomNavFixed, isScrolledToTop, previousScrollPosition };
  }
  