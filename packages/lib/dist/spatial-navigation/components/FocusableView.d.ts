/// <reference types="react" />
import { ViewStyle, ViewProps } from 'react-native';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
type FocusableViewProps = {
    style?: ViewStyle;
    children: React.ReactElement | ((props: {
        isFocused: boolean;
        isActive: boolean;
    }) => React.ReactElement);
    viewProps?: ViewProps & {
        onMouseEnter?: () => void;
    };
};
export declare const SpatialNavigationFocusableView: import("react").ForwardRefExoticComponent<{
    onFocus?: (() => void) | undefined;
    onBlur?: (() => void) | undefined;
    onSelect?: (() => void) | undefined;
    onActive?: (() => void) | undefined;
    onInactive?: (() => void) | undefined;
    orientation?: import("../types/orientation").NodeOrientation | undefined;
    index?: number | undefined;
    alignInGrid?: boolean | undefined;
    indexRange?: import("@bam.tech/lrud").NodeIndexRange | undefined;
    additionalOffset?: number | undefined;
} & FocusableViewProps & import("react").RefAttributes<SpatialNavigationNodeRef>>;
export {};
