import React from 'react';
import { NodeOrientation } from '../types/orientation';
import { NodeIndexRange } from '@bam.tech/lrud';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
type FocusableProps = {
    isFocusable: true;
    children: (props: {
        isFocused: boolean;
        isActive: boolean;
    }) => React.ReactElement;
};
type NonFocusableProps = {
    isFocusable?: false;
    children: React.ReactElement | ((props: {
        isActive: boolean;
    }) => React.ReactElement);
};
type DefaultProps = {
    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: () => void;
    onActive?: () => void;
    onInactive?: () => void;
    orientation?: NodeOrientation;
    /** Use this for nodes alignment.
     * @see LRUD docs */
    index?: number;
    /** Use this for grid alignment.
     * @see LRUD docs */
    alignInGrid?: boolean;
    indexRange?: NodeIndexRange;
    /**
     * This is an additional offset useful only for the scrollview. It adds up to the offsetFromStart of the scrollview.
     */
    additionalOffset?: number;
};
type Props = DefaultProps & (FocusableProps | NonFocusableProps);
export type SpatialNavigationNodeDefaultProps = DefaultProps;
export declare const SpatialNavigationNode: React.ForwardRefExoticComponent<Props & React.RefAttributes<SpatialNavigationNodeRef>>;
export {};
