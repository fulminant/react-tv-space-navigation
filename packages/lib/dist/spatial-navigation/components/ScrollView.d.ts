import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
type Props = {
    horizontal?: boolean;
    /**
     * Use this offset to prevent the element from sticking too closely to the edges of the screen during scrolling.
     * This is a margin in pixels.
     */
    offsetFromStart?: number;
    children: React.ReactNode;
    style?: ViewStyle;
    /** Arrow that will show up inside the arrowContainer */
    descendingArrow?: ReactElement;
    /** Arrow that will show up inside the arrowContainer */
    ascendingArrow?: ReactElement;
    /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
    descendingArrowContainerStyle?: ViewStyle;
    /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
    ascendingArrowContainerStyle?: ViewStyle;
    /** Number of pixels scrolled every 10ms - only when using web cursor pointer to scroll */
    pointerScrollSpeed?: number;
};
export declare const SpatialNavigationScrollView: ({ horizontal, style, offsetFromStart, children, ascendingArrow, ascendingArrowContainerStyle, descendingArrow, descendingArrowContainerStyle, pointerScrollSpeed, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
