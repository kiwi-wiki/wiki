import { Children, isValidElement } from 'react';

/**
 * Returns the valid children of a React component.
 */
export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter(child => isValidElement(child)) as React.ReactElement[];
}
