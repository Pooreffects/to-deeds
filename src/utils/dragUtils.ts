export type IndicatorElement = HTMLElement;

export interface NearestIndicator {
  offset: number;
  element: IndicatorElement;
}

/**
 * Highlights the nearest indicator based on the drag event.
 * @param e - The drag event.
 * @param column - The column ID to filter indicators.
 */

export function highlightIndicator(
  e: React.DragEvent<HTMLDivElement>,
  column: string
): void {
  const indicators = getIndicators(column);
  clearHighlights(column, indicators);
  const el = getNearestIndicator(e, indicators);
  el.element.style.opacity = '1';
}

/**
 * Clears the highlights from the given indicators.
 * @param els - Optional array of indicators to clear. Defaults to all indicators.
 */

export function clearHighlights(
  column: string,
  els?: IndicatorElement[]
): void {
  const indicators = els || getIndicators(column);
  indicators.forEach((i) => {
    if (i instanceof HTMLElement) {
      i.style.opacity = '0';
    }
  });
}

/**
 * Finds the nearest indicator based on the drag event.
 * @param e - The drag event.
 * @param indicators - The list of indicators to check.
 * @returns The nearest indicator.
 */

export function getNearestIndicator(
  e: React.DragEvent<HTMLDivElement>,
  indicators: IndicatorElement[]
): NearestIndicator {
  const DISTENCE_OFFSET = 50;

  const el = indicators.reduce<NearestIndicator>(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - (box.top + DISTENCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return el;
}

/**
 * Gets all indicators for the specified column.
 * @param column - The column ID to filter indicators.
 * @returns Array of indicator elements.
 */

export function getIndicators(column: string): IndicatorElement[] {
  return Array.from(
    document.querySelectorAll(`[data-column="${column}"]`)
  ) as IndicatorElement[];
}
