import { Direction, Lrud } from '@bam.tech/lrud';
export type OnDirectionHandledWithoutMovement = (direction: Direction) => void;
type OnDirectionHandledWithoutMovementRef = {
    current: OnDirectionHandledWithoutMovement;
};
type SpatialNavigatorParams = {
    onDirectionHandledWithoutMovementRef: OnDirectionHandledWithoutMovementRef;
};
export default class SpatialNavigator {
    private lrud;
    private onDirectionHandledWithoutMovementRef;
    constructor({ onDirectionHandledWithoutMovementRef, }: SpatialNavigatorParams);
    private registerMap;
    registerNode(...params: Parameters<Lrud['registerNode']>): void;
    unregisterNode(...params: Parameters<Lrud['unregisterNode']>): void;
    handleKeyDown(direction: Direction | null): Promise<void>;
    hasOneNodeFocused(): boolean;
    /**
     * Sometimes we need to focus an element, but it is not registered yet.
     * That's where we put this waiting element.
     */
    private focusQueue;
    /**
     * To handle the default focus, we want to queue the element to be focused.
     * We queue it because it might not be registered yet when it asks for focus.
     *
     * We queue it only if there is no currently focused element already (or currently queued),
     * because multiple elements might try to take the focus (DefaultFocus is a context, so all its children
     * will try to grab it). We only want the first of these element to grab it.
     */
    handleOrQueueDefaultFocus: (id: string) => void;
    /**
     * Sometimes we want to queue focus an element, even if one is already focused.
     * That happens with an imperative focus for example. I can force a focus to an element,
     * even though another one is already focused.
     *
     * Still, I want to queue it, because the element might not be registered yet (example: in the case of virtualized lists)
     */
    queueFocus: (id: string) => void;
    /**
     * This will focus the currently queued element if it exists.
     * Otherwise, it will do nothing.
     *
     * This function will eventually be called with the proper element
     * when the element is finally registered.
     */
    private handleQueuedFocus;
    grabFocus: (id: string) => void;
    getCurrentFocusNode: () => import("@bam.tech/lrud").Node | undefined;
    private get hasRootNode();
}
export {};
