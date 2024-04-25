/// <reference types="react" />
import { ViewStyle } from 'react-native';
import { NodeOrientation } from '../../types/orientation';
/**
 * @TODO: VirtualizedList should be able to take any data as params.
 * We shouldn't restrict the use to a data that is indexed -> a mistake can be made on usage
 * if the data is not indexed properly for example.
 * The indexing should be done inside VirtualizedList directly & VirtualizedListProps
 * should accept any generic type T.
 */
export type ItemWithIndex = {
    index: number;
};
export type ScrollBehavior = 'stick-to-start' | 'stick-to-end' | 'jump-on-scroll';
export interface VirtualizedListProps<T> {
    data: T[];
    renderItem: (args: {
        item: T;
    }) => JSX.Element;
    /** If vertical the height of an item, otherwise the width */
    itemSize: number | ((item: T) => number);
    currentlyFocusedItemIndex: number;
    /** How many items are RENDERED (virtualization size) */
    numberOfRenderedItems: number;
    /** How many items are visible on screen (helps with knowing how to slice our data and to stop the scroll at the end of the list) */
    numberOfItemsVisibleOnScreen: number;
    onEndReached?: () => void;
    /** Number of items left to display before triggering onEndReached */
    onEndReachedThresholdItemsNumber?: number;
    style?: ViewStyle;
    orientation?: NodeOrientation;
    /**
     * @deprecated
     * Use a custom key instead of the recycling.
     * */
    keyExtractor?: (index: number) => string;
    /** Total number of expected items for infinite scroll (helps aligning items) used for pagination */
    nbMaxOfItems?: number;
    /** Duration of a scrolling animation inside the VirtualizedList */
    scrollDuration?: number;
    /** The size of the list in its scrollable axis */
    listSizeInPx: number;
    scrollBehavior?: ScrollBehavior;
    testID?: string;
}
/**
 * DO NOT use this component directly !
 * You should use the component SpatialNavigationVirtualizedList.tsx to render navigable lists of components.
 *
 * Why this has been made:
 *   - it gives us full control on the way we scroll (using CSS animations)
 *   - it is way more performant than a FlatList
 */
export declare const VirtualizedList: (<T extends ItemWithIndex>({ data, renderItem, itemSize, currentlyFocusedItemIndex, numberOfRenderedItems, numberOfItemsVisibleOnScreen, onEndReached, onEndReachedThresholdItemsNumber, style, orientation, nbMaxOfItems, keyExtractor, scrollDuration, listSizeInPx, scrollBehavior, testID, }: VirtualizedListProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName?: string | undefined;
};
