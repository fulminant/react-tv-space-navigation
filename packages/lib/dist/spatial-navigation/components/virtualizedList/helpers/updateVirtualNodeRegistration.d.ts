/**
 * This function aims to compare 2 arrays of items : currentItems and previousItems and :
 * - addVirtualNode for every item from currentItems that weren't in previousItems
 * - removeVirtualNode for every item from previousItems that aren't there anymore in currentItems
 * - re-order all the items
 * For now it only does the Step 1.
 */
export declare const updateVirtualNodeRegistration: <T>({ currentItems, previousItems, addVirtualNode, }: {
    currentItems: T[];
    previousItems: T[];
    addVirtualNode: (index: number) => void;
}) => void;
