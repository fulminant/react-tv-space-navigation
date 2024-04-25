(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-native"));
	else if(typeof define === 'function' && define.amd)
		define("ReactSpatialNavigation", ["react", "react-native"], factory);
	else if(typeof exports === 'object')
		exports["ReactSpatialNavigation"] = factory(require("react"), require("react-native"));
	else
		root["ReactSpatialNavigation"] = factory(root["react"], root["react-native"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__8156__, __WEBPACK_EXTERNAL_MODULE__9925__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7295:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Directions: () => (/* binding */ Directions),
/* harmony export */   Lrud: () => (/* binding */ Lrud),
/* harmony export */   Orientations: () => (/* binding */ Orientations)
/* harmony export */ });
/* eslint no-unused-vars: "off", @typescript-eslint/no-explicit-any: "off", no-use-before-define: "off" */
var Directions;
(function (Directions) {
    Directions["LEFT"] = "left";
    Directions["RIGHT"] = "right";
    Directions["UP"] = "up";
    Directions["DOWN"] = "down";
    Directions["ENTER"] = "enter";
    Directions["UNSPECIFIED"] = "*";
})(Directions || (Directions = {}));
var Orientations;
(function (Orientations) {
    Orientations["VERTICAL"] = "vertical";
    Orientations["HORIZONTAL"] = "horizontal";
})(Orientations || (Orientations = {}));

var KeyCodes = {
    4: Directions.LEFT,
    21: Directions.LEFT,
    37: Directions.LEFT,
    214: Directions.LEFT,
    205: Directions.LEFT,
    218: Directions.LEFT,
    5: Directions.RIGHT,
    22: Directions.RIGHT,
    39: Directions.RIGHT,
    213: Directions.RIGHT,
    206: Directions.RIGHT,
    217: Directions.RIGHT,
    29460: Directions.UP,
    19: Directions.UP,
    38: Directions.UP,
    211: Directions.UP,
    203: Directions.UP,
    215: Directions.UP,
    29461: Directions.DOWN,
    20: Directions.DOWN,
    40: Directions.DOWN,
    212: Directions.DOWN,
    204: Directions.DOWN,
    216: Directions.DOWN,
    29443: Directions.ENTER,
    13: Directions.ENTER,
    67: Directions.ENTER,
    32: Directions.ENTER,
    23: Directions.ENTER,
    195: Directions.ENTER
};

/**
 * Given an array of values and a goal, return the value from values which is closest to the goal.
 *
 * @param {number[]} values
 * @param {number} goal
 */
var closestIndex = function (values, goal) { return values.reduce(function (prev, curr) {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
}); };
/**
 * Checks if a given node is focusable.
 *
 * @param {object} node - node to check against focusability
 */
var isNodeFocusable = function (node) {
    if (!node) {
        return false;
    }
    return node.isFocusable != null ? node.isFocusable : !!node.selectAction;
};
/**
 * Given a keyCode, lookup and return the direction from the keycodes mapping file.
 *
 * @param {number} keyCode - key code for which corresponding direction is searched
 */
var getDirectionForKeyCode = function (keyCode) {
    return KeyCodes[keyCode];
};
/**
 * Given an orientation and a direction, do they match?
 *
 * I.e an orientation `horizontal` and direction `left` or `right` is considered matching.
 *
 * Direction CAN be passed as `*` (wildcard). this will always return true.
 *
 * @param {string} orientation - orientation to match with the direction
 * @param {string} direction - direction to match with the orientation
 */
var isDirectionAndOrientationMatching = function (orientation, direction) {
    if (!orientation || !direction) {
        return false;
    }
    var validOrientation = toValidOrientation(orientation);
    var validDirection = toValidDirection(direction);
    return ((validDirection === Directions.UNSPECIFIED) ||
        (validOrientation === Orientations.VERTICAL && (validDirection === Directions.UP || validDirection === Directions.DOWN)) ||
        (validOrientation === Orientations.HORIZONTAL && (validDirection === Directions.LEFT || validDirection === Directions.RIGHT)));
};
/**
 * Returns a child from the given node whose indexRange encompasses the given index.
 *
 * @param {object} node - node, which children index ranges will be examined
 * @param {number} index - examined index value
 */
var findChildWithMatchingIndexRange = function (node, index) {
    if (!node || !node.children) {
        return undefined;
    }
    for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if (child.indexRange && (child.indexRange[0] <= index && child.indexRange[1] >= index)) {
            return child;
        }
    }
    return undefined;
};
/**
 * Returns a child from the given node whose index is numerically closest to the given index.
 *
 * If an indexRange is provided, first check if the node's activeChild is inside
 * the indexRange. If it is, return the activeChild node instead
 *
 * @param {object} node
 * @param {number} index
 * @param {number[]} indexRange
 */
var findChildWithClosestIndex = function (node, index, indexRange) {
    if (!node || !node.children) {
        return undefined;
    }
    // if we have an indexRange, and the nodes active child is inside that index range,
    // just return the active child
    if (indexRange && node.activeChild &&
        node.activeChild.index >= indexRange[0] && node.activeChild.index <= indexRange[1] &&
        isNodeFocusable(node.activeChild)) {
        return node.activeChild;
    }
    var indices = [];
    for (var i = 0; i < node.children.length; i++) {
        if (isNodeFocusable(node.children[i]) || node.children[i].children) {
            indices.push(i);
        }
    }
    if (indices.length <= 0) {
        return undefined;
    }
    return node.children[closestIndex(indices, index)];
};
/**
 * Inserts given child to the parent's children, keeping indices coherent and compact.
 *
 * @param parent - node to which new child is about to be added
 * @param newChild - node to be added to the parent
 */
var insertChildNode = function (parent, newChild) {
    if (!parent || !newChild) {
        return;
    }
    if (!parent.children) {
        parent.children = [];
    }
    newChild.parent = parent;
    if (typeof newChild.index !== 'number' || newChild.index > parent.children.length) {
        newChild.index = parent.children.length;
        parent.children.push(newChild);
    }
    else {
        // Inserting new child, from now on all further children needs to have index value increased by one
        parent.children.splice(newChild.index, 0, newChild);
        for (var i = newChild.index + 1; i < parent.children.length; i++) {
            parent.children[i].index = i;
        }
    }
};
/**
 * Removes given child from the parent's children, keeping indices coherent and compact.
 *
 * @param parent - node from which children given child is about to be removed
 * @param child - node to be removed from parent's children
 */
var removeChildNode = function (parent, child) {
    if (!child || !parent || !parent.children) {
        return;
    }
    var removedChildIndex = -1;
    for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === child) {
            removedChildIndex = i;
        }
        else if (removedChildIndex !== -1) {
            parent.children[i].index = i - 1;
        }
    }
    if (removedChildIndex !== -1) {
        if (parent.children.length === 1) {
            parent.children = undefined;
        }
        else {
            parent.children.splice(removedChildIndex, 1);
        }
    }
};
/**
 * Returns valid orientation parameter.
 *
 * TypeScript defines type appropriately, but in JavaScript anything can be passed. Method doesn't imply that user
 * might be malicious, it just tries to unify provided string values, by making them a valid Orientation type.
 *
 * @param orientation - orientation to correct
 */
var toValidOrientation = function (orientation) {
    if (!orientation) {
        return undefined;
    }
    for (var _i = 0, _a = Object.keys(Orientations); _i < _a.length; _i++) {
        var orientationKey = _a[_i];
        if (Orientations[orientationKey] === orientation.toLowerCase()) {
            return Orientations[orientationKey];
        }
    }
    return undefined;
};
/**
 * Returns valid direction parameter.
 *
 * TypeScript defines type appropriately, but in JavaScript anything can be passed. Method doesn't imply that user
 * might be malicious, it just tries to unify provided string values, by making them a valid Orientation type.
 *
 * @param direction - direction to correct
 */
var toValidDirection = function (direction) {
    if (!direction) {
        return undefined;
    }
    for (var _i = 0, _a = Object.keys(Directions); _i < _a.length; _i++) {
        var directionKey = _a[_i];
        if (Directions[directionKey] === direction.toLowerCase()) {
            return Directions[directionKey];
        }
    }
    return undefined;
};
/**
 * Creates node object from given node parameters.
 *
 * Node creation method is optimized for JavaScript engine.
 * Objects created in "the same way" allows JavaScript engine reusing existing HiddenClass transition chain.
 * Moreover most used properties are defined "at the beginning" making access to them a bit faster.
 *
 * @param {string} nodeId - id of the node
 * @param {object} [nodeConfig] - node parameters
 */
var prepareNode = function (nodeId, nodeConfig) {
    if (nodeConfig === void 0) { nodeConfig = {}; }
    if (!nodeId) {
        throw Error('Node ID has to be defined');
    }
    return {
        id: nodeId,
        parent: undefined,
        children: undefined,
        activeChild: undefined,
        overrides: undefined,
        overrideSources: undefined,
        index: (typeof nodeConfig.index === 'number') ? nodeConfig.index : undefined,
        orientation: nodeConfig.orientation,
        indexRange: nodeConfig.indexRange,
        selectAction: nodeConfig.selectAction,
        isFocusable: nodeConfig.isFocusable,
        isWrapping: nodeConfig.isWrapping,
        isStopPropagate: nodeConfig.isStopPropagate,
        isIndexAlign: nodeConfig.isIndexAlign,
        useMeForIndexAlign: nodeConfig.useMeForIndexAlign,
        onLeave: nodeConfig.onLeave,
        onEnter: nodeConfig.onEnter,
        shouldCancelLeave: nodeConfig.shouldCancelLeave,
        onLeaveCancelled: nodeConfig.onLeaveCancelled,
        shouldCancelEnter: nodeConfig.shouldCancelEnter,
        onEnterCancelled: nodeConfig.onEnterCancelled,
        onSelect: nodeConfig.onSelect,
        onInactive: nodeConfig.onInactive,
        onActive: nodeConfig.onActive,
        onActiveChildChange: nodeConfig.onActiveChildChange,
        onBlur: nodeConfig.onBlur,
        onFocus: nodeConfig.onFocus,
        onMove: nodeConfig.onMove
    };
};
/**
 * Traverses through node subtree (including the node) with iterative preorder deep first search tree traversal algorithm.
 *
 * DFS is implemented without recursion to avoid putting methods to the stack. This allows traversing deep trees without
 * the need of allocating memory for recursive method calls.
 *
 * For some processes, when node meeting some condition is searched, there's no need to traverse through whole tree.
 * To address that, given nodeProcessor may return boolean value. when true is returned, than traversal algorithm
 * is interrupted immediately.
 *
 * E.g. Given tree:
 *        root
 *        / \
 *       A   B
 *      /     \
 *     AA      BA
 *    /  \
 *  AAA  AAB
 *
 *  Traversal path: root -> A -> AA -> AAA -> AAB -> B -> BA
 *
 * @param {object} startNode - node that is the root of traversed subtree
 * @param {function} nodeProcessor - callback executed for traversed node, if true is returned then subtree traversal is interrupted
 */
var traverseNodeSubtree = function (startNode, nodeProcessor) {
    var stack = [startNode];
    var dummyThis = Object.create(null);
    var traversedNode;
    while (stack.length > 0) {
        traversedNode = stack.pop();
        if (nodeProcessor.call(dummyThis, traversedNode)) {
            return;
        }
        if (traversedNode.children) {
            for (var i = traversedNode.children.length - 1; i >= 0; i--) {
                stack.push(traversedNode.children[i]);
            }
        }
    }
};

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

var Lrud = /** @class */ (function () {
    function Lrud() {
        this.nodes = {};
        this.rootNode = undefined;
        this.currentFocusNode = undefined;
        this.isIndexAlignMode = false;
        this.emitter = mitt();
    }
    /**
     * Registers a callback for an LRUD event.
     *
     * @param {string} eventName - event to subscribe to
     * @param {function} callback - function to call on event
     */
    Lrud.prototype.on = function (eventName, callback) {
        this.emitter.on(eventName, callback);
    };
    /**
     * Unregisters a callback for an LRUD event.
     *
     * @param {string} eventName - event to unsubscribe from
     * @param {function} callback - function that was added using .on()
     */
    Lrud.prototype.off = function (eventName, callback) {
        this.emitter.off(eventName, callback);
    };
    /**
     * Returns the root node.
     */
    Lrud.prototype.getRootNode = function () {
        if (!this.rootNode) {
            throw new Error('no root node');
        }
        return this.rootNode;
    };
    /**
     * Returns the current focused node.
     */
    Lrud.prototype.getCurrentFocusNode = function () {
        return this.currentFocusNode;
    };
    /**
     * Registers a new node into the LRUD tree.
     *
     * @param {string} nodeId - id of the node to register
     * @param {object} [nodeConfig] - registered node parameters
     * @param {string} [nodeConfig.parent] - parent node id, if null, default root node is used
     * @param {number} [nodeConfig.index] - if null, index is 1 more than the index of the last sibling. if no previous siblings, index is 1
     * @param {number[]} [nodeConfig.indexRange] - defaults to null. acts as a colspan, value [0] is lower bound, value [1] is upper bound
     * @param {object} [nodeConfig.selectAction] - if a node has a selectAction, it is focusable
     * @param {boolean} [nodeConfig.isFocusable] - if a node is explicitly set as isFocusable, it is focusable
     * @param {boolean} [nodeConfig.isWrapping] - if true, when asking for the next child at the end or start of the node, the will "wrap around" and return the first/last (when asking for the last/first)
     * @param {string} [nodeConfig.orientation] - can be "vertical" or "horizontal". is used in conjunction when handling direction of key press, to determine which child is "next"
     * @param {boolean} [nodeConfig.isIndexAlign]  -if a node is index aligned, its descendents should jump to nodes based on index instead of activeChild
     * @param {function} [nodeConfig.onLeave] - if a node has an `onLeave` function, it will be run when a move event leaves this node
     * @param {function} [nodeConfig.onEnter] - if a node has an `onEnter` function, it will be run when a move event enters this node
     */
    Lrud.prototype.registerNode = function (nodeId, nodeConfig) {
        var _a;
        if (nodeConfig === void 0) { nodeConfig = {}; }
        if (this.getNode(nodeId)) {
            throw Error("Node with an ID of " + nodeId + " has already been registered");
        }
        // It is not allowed to register node directly with children, for such purposes registerTree should be used
        var node = prepareNode(nodeId, nodeConfig);
        // if this is the very first node, set it as root and return...
        if (!this.rootNode) {
            this.rootNode = node;
            this.nodes = (_a = {}, _a[nodeId] = node, _a);
            return this;
        }
        // if this node config has no parent, assume its parent is root
        var parentNode = nodeConfig.parent ? this.getNode(nodeConfig.parent) : this.rootNode;
        // to keep tree coherent, nodes that are about to be added to not existing parent are ignored
        if (!parentNode) {
            return this;
        }
        // add the node into the tree
        this.nodes[nodeId] = node;
        insertChildNode(parentNode, node);
        return this;
    };
    /**
     * Allows to change node's parent by moving it's whole sub-tree.
     *
     * @param {string|object} node - node or id of the node that is about to change parent
     * @param {string|object} newParentNode - node or id of the node that became a new parent for nodeId
     * @param {object} [options]
     * @param {number} [options.index] - index at which nodeId should be inserted as a child of newParentNodeId
     * @param {boolean} [options.maintainIndex] - applies only if index is not defined; if true, node will be inserted at
     *                                           it's current position if possible; otherwise node will be appended; default: false
     */
    Lrud.prototype.moveNode = function (node, newParentNode, options) {
        if (options === void 0) { options = { maintainIndex: false }; }
        node = typeof node === 'string' ? this.getNode(node) : node;
        newParentNode = typeof newParentNode === 'string' ? this.getNode(newParentNode) : newParentNode;
        if (!node || !newParentNode) {
            return;
        }
        // It's not possible to move root node
        if (node === this.rootNode) {
            return;
        }
        // There's no need to change the parent
        if (node.parent === newParentNode) {
            return;
        }
        var oldParentNode = node.parent;
        // Removing node from old parent
        removeChildNode(oldParentNode, node);
        // Changing parent of a node
        if (typeof options.index === 'number') {
            node.index = options.index;
        }
        else if (!options.maintainIndex) {
            node.index = undefined;
        }
        insertChildNode(newParentNode, node);
        // If moved node was an active child of the old parent, it needs to be cleaned out as well
        this.unsetActiveChild(oldParentNode, node);
        // If moved node which is (or it's subtree contains) currently focused node, then parent's active child needs to be adjusted
        if (this.isSameOrParentForChild(node, this.currentFocusNode)) {
            this.setActiveChildRecursive(newParentNode, node);
        }
    };
    /**
     * Registers a new node into the LRUD tree.
     *
     * Kept for backwards compatibility reasons.
     *
     * @param {string} nodeId - id of the node to register
     * @param {object} [nodeConfig] - registered node parameters
     */
    Lrud.prototype.register = function (nodeId, nodeConfig) {
        return this.registerNode(nodeId, nodeConfig);
    };
    /**
     * Unregisters a node from the navigation tree.
     *
     * Kept for backwards compatibility reasons.
     *
     * @param {string|object} node - node or id of the node to unregister
     * @param {object} [unregisterOptions]
     */
    Lrud.prototype.unregister = function (node, unregisterOptions) {
        this.unregisterNode(node, unregisterOptions);
    };
    /**
     * Unregisters a node from the navigation tree.
     *
     * @param {string|object} node - node or id of the node to unregister
     * @param {object} [unregisterOptions]
     * @param {boolean} [unregisterOptions.forceRefocus] if true, LRUD will attempt to re-focus on a new node if the currently focused
     *                                                   node becomes unregistered due to the given node ID being unregistered
     */
    Lrud.prototype.unregisterNode = function (node, unregisterOptions) {
        var _this = this;
        if (unregisterOptions === void 0) { unregisterOptions = { forceRefocus: true }; }
        node = typeof node === 'string' ? this.getNode(node) : node;
        // if we're trying to unregister a node that doesn't exist, exit out
        if (!node) {
            return this;
        }
        if (node === this.rootNode) {
            this.nodes = {};
            this.rootNode = undefined;
            this.currentFocusNode = undefined;
            this.isIndexAlignMode = false;
            this.emitter = mitt();
            return this;
        }
        // get a copy of the node to pass to the blur event, and grab the parent to work with it
        var parentNode = node.parent;
        // ...if we're unregistering the activeChild of our parent (could be a leaf OR branch)
        // we might need to recalculate the focus...
        if (parentNode.activeChild && parentNode.activeChild === node) {
            this.isIndexAlignMode = false;
            this.unsetActiveChild(parentNode, node);
        }
        // delete the node itself (delete from the parent and re-set the parent later)
        removeChildNode(parentNode, node);
        // releasing memory references for node and all it's children all node's children
        var currentFocusIsLost = false;
        traverseNodeSubtree(node, function (traversedNode) {
            delete _this.nodes[traversedNode.id];
            // Unregistering overrides
            _this.unregisterOverride(traversedNode);
            // Unregistering overrides which pointed to unregistered node
            for (var i = 0, overrideSources = traversedNode.overrideSources || []; i < overrideSources.length; i++) {
                _this.unregisterOverride(overrideSources[i].node, overrideSources[i].direction);
            }
            // Unregistering currently focused node
            if (traversedNode === _this.currentFocusNode) {
                _this.currentFocusNode = undefined;
                currentFocusIsLost = true;
            }
        });
        // blur on the nodeClone
        this.emitter.emit('blur', node);
        if (node.onBlur) {
            node.onBlur(node);
        }
        // check if the current focus node was removed, if so focus needs to be recalculated
        if (currentFocusIsLost && unregisterOptions.forceRefocus) {
            this.recalculateFocus(parentNode);
        }
        return this;
    };
    /**
     * Registers a new override onto the LRUD instance.
     *
     * @param {string|object} source - node or id of the node for which override should be triggered
     * @param {string|object} target - node or id of the node to which this overrides points
     * @param {string} direction - traversal direction, for which this override should be triggered
     * @param {object} [options]
     * @param {boolean} [options.forceOverride] if true, existing override from source node in direction will be overwritten.
     */
    Lrud.prototype.registerOverride = function (source, target, direction, options) {
        if (options === void 0) { options = {}; }
        source = typeof source === 'string' ? this.getNode(source) : source;
        if (!source) {
            throw new Error('registering override: missing source node');
        }
        target = typeof target === 'string' ? this.getNode(target) : target;
        if (!target) {
            throw new Error('registering override: missing target node');
        }
        direction = toValidDirection(direction);
        if (!direction) {
            throw new Error('registering override: missing direction');
        }
        if (source.overrides && source.overrides[direction]) {
            if (options.forceOverride) {
                this.unregisterOverride(source, direction);
            }
            else {
                throw new Error("registering override: override from " + source.id + " to " + target.id + " in direction " + direction + " already exist");
            }
        }
        source.overrides = source.overrides || {};
        source.overrides[direction] = target;
        target.overrideSources = target.overrideSources || [];
        target.overrideSources.push({ direction: direction, node: source });
        return this;
    };
    /**
     * Unregisters an override from the LRUD instance.
     *
     * @param {string|object} source - node or id of the node for which override should be unregistered
     * @param {string} [direction] - traversal direction, in which override should be unregistered
     */
    Lrud.prototype.unregisterOverride = function (source, direction) {
        source = typeof source === 'string' ? this.getNode(source) : source;
        if (!source || !source.overrides) {
            return;
        }
        // if no direction provided, than removing all overrides
        // if unknown direction provided, then aborting
        if (direction) {
            direction = toValidDirection(direction);
            if (!direction) {
                return;
            }
        }
        var overridesToAreEmpty = true;
        for (var _i = 0, _a = Object.keys(Directions); _i < _a.length; _i++) {
            var directionKey = _a[_i];
            var directionToRemove = Directions[directionKey];
            if (direction && direction !== directionToRemove) {
                overridesToAreEmpty = overridesToAreEmpty && !(source.overrides && source.overrides[directionToRemove]);
                continue;
            }
            // removing reference to source node in target overridden in direction
            var target = source.overrides[directionToRemove];
            if (target && target.overrideSources) {
                for (var i = 0; i < target.overrideSources.length; i++) {
                    if (target.overrideSources[i].direction === directionToRemove && target.overrideSources[i].node === source) {
                        if (target.overrideSources.length === 1) {
                            target.overrideSources = undefined;
                        }
                        else {
                            // The fastest way of removing element from array without maintaining the order:
                            // put last element into removed one slot and make array shorter
                            target.overrideSources[i] = target.overrideSources[target.overrideSources.length - 1];
                            target.overrideSources.length = target.overrideSources.length - 1;
                        }
                        break;
                    }
                }
            }
            // removing override
            source.overrides[directionToRemove] = undefined;
        }
        // cleaning if no overrides defined
        if (overridesToAreEmpty) {
            source.overrides = undefined;
        }
        return this;
    };
    /**
     * Returns a node for an ID.
     *
     * @param {string} nodeId - id of the node to be returned
     */
    Lrud.prototype.getNode = function (nodeId) {
        if (!nodeId) {
            return undefined;
        }
        return this.nodes[nodeId];
    };
    /**
     * Gets a node by ID and then unregisters it from the instance.
     *
     * @param {string} nodeId - id of the node to be picked
     */
    Lrud.prototype.pickNode = function (nodeId) {
        var node = this.getNode(nodeId);
        if (!node) {
            return undefined;
        }
        this.unregisterNode(node);
        return node;
    };
    /**
     * Starting from a node, climb up the navigation tree until we find a node that can be
     * actioned, based on the given direction. An actionable node is one whose orientation is valid
     * for the given direction, has focusable children and whose activeChild isn't a leaf that is
     * also its current activeChild.
     *
     * @param {object} node - node from which climbing up starts
     * @param {string} direction - direction in which to traverse while climbing up
     */
    Lrud.prototype.climbUp = function (node, direction) {
        while (node) {
            // if we have a matching override at this point in the climb, return that target node
            if (node.overrides && node.overrides[direction]) {
                return node.overrides[direction];
            }
            // if we're on a currently focused node, climb up, definitely we are looking for some other node
            if (node === this.currentFocusNode) {
                // climb up
                node = node.parent;
                continue;
            }
            // we have children, but the orientation doesn't match, so try our parent
            if (!isDirectionAndOrientationMatching(node.orientation, direction)) {
                // climb up
                node = node.parent;
                continue;
            }
            // if we couldn't find any focusable candidate within children or we get currently
            // activeChild, we have to look for other focusable candidate, climb up
            if (!this.getNextFocusableChildInDirection(node, direction)) {
                // climb up
                node = node.parent;
                continue;
            }
            return node;
        }
        return undefined;
    };
    /**
     * Starting from the given node, dig down the navigation tree until we find a focusable
     * leaf, and return it. dig "direction" priority:
     * - index align mode
     * - active child
     * - first focusable child
     *
     * @param {object} node - node, from which digging down starts
     * @param {string} [direction] - direction in which to traverse while digging down
     */
    Lrud.prototype.digDown = function (node, direction) {
        if (direction === void 0) { direction = Directions.UNSPECIFIED; }
        var _loop_1 = function () {
            // If the node is focusable, then return it, but only when it doesn't contain focusable children.
            // Otherwise, digging down to "the deepest" focusable node.
            // Focusable "leaf" has a higher priority than focusable "container".
            if (isNodeFocusable(node) && (node.isStopPropagate || !this_1.doesNodeHaveFocusableChildren(node))) {
                return { value: node };
            }
            /*
            if we're in a nested grid
              if we're going VERTICAL DOWN
                take the first child, and then match the index
              if we're going VERTICAL UP
                take the last child, and then match the index
      
            if we're in a nested grid
              and we're going HORIZONTAL LEFT
                take the matching index of the same depth, and then the last child
              and we're going HORIZONTAL RIGHT
                take the matching index of the same depth, and then the first child
      
            if its not a nested grid, take the matching index
            */
            if (this_1.isIndexAlignMode) {
                var currentFocusedNode_1 = this_1.getCurrentFocusNode();
                var currentFocusedIndexRange_1 = currentFocusedNode_1.indexRange;
                var getIndex = function () {
                    var useMeForIndexAlign = currentFocusedNode_1.parent.useMeForIndexAlign;
                    if (useMeForIndexAlign) {
                        return currentFocusedNode_1.parent.index;
                    }
                    if (currentFocusedIndexRange_1) {
                        return currentFocusedIndexRange_1[0];
                    }
                    return currentFocusedNode_1.index;
                };
                var currentFocusedIndex = getIndex();
                if (node.isIndexAlign) {
                    // we're in a nested grid, so need to take into account orientation and direction of travel
                    if (node.parent.orientation === Orientations.VERTICAL) {
                        if (direction === Directions.UP) {
                            // dig down
                            node = findChildWithClosestIndex(this_1.getNodeLastChild(node), currentFocusedIndex, currentFocusedIndexRange_1);
                            return "continue";
                        }
                        if (direction === Directions.DOWN) {
                            // dig down
                            node = findChildWithClosestIndex(this_1.getNodeFirstChild(node), currentFocusedIndex, currentFocusedIndexRange_1);
                            return "continue";
                        }
                    }
                    if (node.parent.orientation === Orientations.HORIZONTAL) {
                        if (direction === Directions.LEFT) {
                            // dig down
                            node = this_1.getNodeLastChild(findChildWithClosestIndex(node, currentFocusedNode_1.parent.index));
                            return "continue";
                        }
                        if (direction === Directions.RIGHT) {
                            // dig down
                            node = this_1.getNodeFirstChild(findChildWithClosestIndex(node, currentFocusedNode_1.parent.index));
                            return "continue";
                        }
                    }
                }
                // we're not in a nested grid, so just look for matching index ranges or index
                var matchingViaIndexRange = findChildWithMatchingIndexRange(node, currentFocusedIndex);
                if (matchingViaIndexRange) {
                    // dig down
                    node = matchingViaIndexRange;
                    return "continue";
                }
                else {
                    // dig down
                    node = findChildWithClosestIndex(node, currentFocusedIndex, currentFocusedIndexRange_1);
                    return "continue";
                }
            }
            // if possible, picking a branch that had focus in the past, one of its children was focused
            if (node.activeChild) {
                // dig down
                node = node.activeChild;
                return "continue";
            }
            // otherwise simply digging deeper, picking branch with first focusable candidate
            node = this_1.getNextFocusableChildInDirection(node, Directions.UNSPECIFIED);
        };
        var this_1 = this;
        while (node) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return undefined;
    };
    /**
     * Gets the semantic next focusable child for a given direction.
     *
     * If the direction is 'left' or 'up', return the semantic previous focusable child of the node.
     * If the direction is 'right' or 'down'', return the semantic next focusable child of the node.
     * If the direction is *, return the semantic next (or previous, if next not found) focusable child of the node.
     *
     * @param {object} node - node, for which next focusable child for a given direction is returned
     * @param {string} direction - direction in which to traverse while searching for next focusable child
     */
    Lrud.prototype.getNextFocusableChildInDirection = function (node, direction) {
        if (!node) {
            return undefined;
        }
        var validOrientation = toValidOrientation(node.orientation);
        var validDirection = toValidDirection(direction);
        var nextChildInDirection;
        var traverseForward = (validDirection === Directions.UNSPECIFIED) ||
            (validOrientation === Orientations.HORIZONTAL && validDirection === Directions.RIGHT) ||
            (validOrientation === Orientations.VERTICAL && validDirection === Directions.DOWN);
        if (traverseForward) {
            nextChildInDirection = this.getNextFocusableChild(node);
        }
        var traverseBackward = (validDirection === Directions.UNSPECIFIED) ||
            (validOrientation === Orientations.HORIZONTAL && validDirection === Directions.LEFT) ||
            (validOrientation === Orientations.VERTICAL && validDirection === Directions.UP);
        if (!nextChildInDirection && traverseBackward) {
            nextChildInDirection = this.getPrevFocusableChild(node);
        }
        return nextChildInDirection;
    };
    /**
     * Gets the semantic "next" child for a node that might be focused or bypass focus to its children.
     *
     * @param {object} node - node, for which next focusable child is returned
     */
    Lrud.prototype.getNextFocusableChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        // there's no child that is (or was) focused, so we can quickly pick first focusable child
        if (!node.activeChild) {
            return this.getNodeFirstFocusableChild(node);
        }
        // starting right after child that is (or was) focused
        for (var i = node.activeChild.index + 1; i < node.children.length; i++) {
            if (this.isNodeFocusableCandidate(node.children[i])) {
                return node.children[i];
            }
        }
        // we haven't found a node so far, so looking from the beginning of list up to current active node if possible
        if (node.isWrapping) {
            for (var i = 0; i < node.activeChild.index; i++) {
                if (this.isNodeFocusableCandidate(node.children[i])) {
                    return node.children[i];
                }
            }
        }
        return undefined;
    };
    /**
     * Gets the semantic "previous" child for a node that might be focused or bypass focus to its children.
     *
     * @param {object} node - node, for which previous focusable child is returned
     */
    Lrud.prototype.getPrevFocusableChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        // there's no child that is (or was) focused, so we can quickly pick last focusable child
        if (!node.activeChild) {
            return this.getNodeLastFocusableChild(node);
        }
        // starting right before child that is (or was) focused
        for (var i = node.activeChild.index - 1; i >= 0; i--) {
            if (this.isNodeFocusableCandidate(node.children[i])) {
                return node.children[i];
            }
        }
        // we haven't found a node so far, so looking from the end of list up to current active node if possible
        if (node.isWrapping) {
            for (var i = node.children.length - 1; i > node.activeChild.index; i--) {
                if (this.isNodeFocusableCandidate(node.children[i])) {
                    return node.children[i];
                }
            }
        }
        return undefined;
    };
    /**
     * Gets the first child of a node, based on index.
     *
     * @param {object} node - node, for which first child is returned
     */
    Lrud.prototype.getNodeFirstChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        return node.children[0];
    };
    /**
     * Gets the last child of a node, based on index.
     *
     * @param {object} node - node, for which last child is returned
     */
    Lrud.prototype.getNodeLastChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        return node.children[node.children.length - 1];
    };
    /**
     * Gets the first focusable (or containing focusable nodes) child of a node, based on index.
     *
     * @param {object} node - node, for which first focusable child is returned
     */
    Lrud.prototype.getNodeFirstFocusableChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        for (var i = 0; i < node.children.length; i++) {
            if (this.isNodeFocusableCandidate(node.children[i])) {
                return node.children[i];
            }
        }
        return undefined;
    };
    /**
     * Gets the last focusable (or containing focusable nodes) child of a node, based on index.
     *
     * @param {object} node - node, for which last focusable child is returned
     */
    Lrud.prototype.getNodeLastFocusableChild = function (node) {
        if (!node || !node.children) {
            return undefined;
        }
        for (var i = node.children.length - 1; i >= 0; i--) {
            if (this.isNodeFocusableCandidate(node.children[i])) {
                return node.children[i];
            }
        }
        return undefined;
    };
    /**
     * Given an event, handle any state changes that may arise from the direction pressed.
     *
     * State changes based on climbing up and digging down from the current focusedNode
     *
     * @param {object} event
     * @param {number} [event.keyCode]
     * @param {string} [event.direction]
     * @param {object} [options]
     * @param {boolean} [options.forceFocus] - if true and there's no currently focused node, LRUD will try to focus
     *                                         first focusable node; default: false
     */
    Lrud.prototype.handleKeyEvent = function (event, options) {
        if (options === void 0) { options = { forceFocus: false }; }
        if (!event) {
            return undefined;
        }
        var direction = (event.keyCode) ? getDirectionForKeyCode(event.keyCode) : toValidDirection(event.direction);
        if (!direction) {
            return undefined;
        }
        var currentFocusNode = this.getCurrentFocusNode();
        // if all we're doing is processing an enter, just run the `onSelect` function of the current node...
        if (direction === Directions.ENTER) {
            if (currentFocusNode) {
                this.emitter.emit('select', currentFocusNode);
                if (currentFocusNode.onSelect) {
                    currentFocusNode.onSelect(currentFocusNode);
                }
            }
            return currentFocusNode;
        }
        var topNode;
        var focusableNode;
        if (!currentFocusNode && options.forceFocus) {
            // No node is focused, focusing first focusable node
            topNode = this.getRootNode();
            focusableNode = this.getNextFocusableChildInDirection(topNode, Directions.UNSPECIFIED);
        }
        else {
            // climb up from where we are...
            topNode = this.climbUp(currentFocusNode, direction);
            // ... if we cant find a top node, its an invalid move - just return
            if (!topNode) {
                return undefined;
            }
            // ...if we need to align indexes, turn the flag on now...
            this.isIndexAlignMode = topNode.isIndexAlign === true;
            // ...get the top's next child in the direction we're going...
            var nextChild = this.getNextFocusableChildInDirection(topNode, direction);
            // ...and depending on if we're able to find a child, dig down from the child or from the original top...
            focusableNode = this.digDown(nextChild || topNode, direction);
        }
        if (!focusableNode) {
            return undefined;
        }
        // ...give an opportunity for the move to be cancelled by the leaving node
        if (currentFocusNode && currentFocusNode.shouldCancelLeave) {
            if (currentFocusNode.shouldCancelLeave(currentFocusNode, focusableNode)) {
                if (currentFocusNode.onLeaveCancelled) {
                    currentFocusNode.onLeaveCancelled(currentFocusNode, focusableNode);
                }
                this.emitter.emit('cancelled', {
                    leave: currentFocusNode,
                    enter: focusableNode
                });
                return currentFocusNode;
            }
        }
        // ...give an opportunity for the move to be cancelled by the entering node
        if (focusableNode.shouldCancelEnter) {
            if (focusableNode.shouldCancelEnter(currentFocusNode, focusableNode)) {
                if (focusableNode.onEnterCancelled) {
                    focusableNode.onEnterCancelled(currentFocusNode, focusableNode);
                }
                this.emitter.emit('cancelled', {
                    leave: currentFocusNode,
                    enter: focusableNode
                });
                return currentFocusNode;
            }
        }
        // ...and then assign focus
        this.assignFocus(focusableNode);
        var offset = (direction === Directions.LEFT || direction === Directions.UP) ? -1 : 1;
        // emit events and fire functions now that the move has completed
        this.emitter.emit('move', {
            leave: currentFocusNode,
            enter: focusableNode,
            direction: direction,
            offset: offset
        });
        if (topNode.onMove) {
            topNode.onMove({
                node: topNode,
                leave: currentFocusNode,
                enter: focusableNode,
                direction: direction,
                offset: offset
            });
        }
        if (currentFocusNode && currentFocusNode.onLeave) {
            currentFocusNode.onLeave(currentFocusNode);
        }
        if (focusableNode.onEnter) {
            focusableNode.onEnter(focusableNode);
        }
        return focusableNode;
    };
    /**
     * Sets the activeChild of the parent node to the value of the child node.
     *
     * @param {string|object} parent - node or id of the node, which activeChild is about to be set
     * @param {string|object} child - node or id of the node, that is about to be set as parent's activeChild
     */
    Lrud.prototype.setActiveChild = function (parent, child) {
        parent = typeof parent === 'string' ? this.getNode(parent) : parent;
        child = typeof child === 'string' ? this.getNode(child) : child;
        if (!parent || !child) {
            return;
        }
        if (child.parent.id !== parent.id) {
            return;
        }
        // the parent already has an active child, and its NOT the same child that we're now setting
        if (parent.activeChild && parent.activeChild.id !== child.id) {
            var currentActiveChild = parent.activeChild;
            parent.activeChild = child;
            this.emitter.emit('inactive', currentActiveChild);
            if (currentActiveChild.onInactive) {
                currentActiveChild.onInactive(currentActiveChild);
            }
            this.emitter.emit('active', child);
            if (child.onActive) {
                child.onActive(child);
            }
            if (parent.onActiveChildChange) {
                parent.onActiveChildChange({
                    node: parent,
                    leave: currentActiveChild,
                    enter: child
                });
            }
        }
        else if (!parent.activeChild) {
            parent.activeChild = child;
            this.emitter.emit('active', child);
            if (child.onActive) {
                child.onActive(child);
            }
            if (parent.onActiveChildChange) {
                parent.onActiveChildChange({
                    node: parent,
                    leave: null,
                    enter: child
                });
            }
        }
    };
    /**
     * Sets the activeChild of the parent node to the value of the child node.
     *
     * If the parent node has a parent itself, it digs up the tree and sets those activeChild values.
     *
     * @param {string|object} parent - node or id of the node, which activeChild is about to be set
     * @param {string|object} child - node or id of the node, that is about to be set as parent's activeChild
     */
    Lrud.prototype.setActiveChildRecursive = function (parent, child) {
        parent = typeof parent === 'string' ? this.getNode(parent) : parent;
        child = typeof child === 'string' ? this.getNode(child) : child;
        while (parent) {
            this.setActiveChild(parent, child);
            // if the parent has a parent, bubble up
            child = parent;
            parent = parent.parent;
        }
    };
    /**
     * Unsets the activeChild of the parent nodes branch ensuring that activeChild is on the unsetting child node path
     * and not on the currentFocusNode's path, unless child node is a currentFocusNode.
     *
     * @param {string|object} parent - node or id of the node, which activeChild is about to be unset
     * @param {string|object} activeChild - node or id of the node, that is about to be unset as parent's activeChild
     */
    Lrud.prototype.unsetActiveChild = function (parent, activeChild) {
        parent = typeof parent === 'string' ? this.getNode(parent) : parent;
        activeChild = typeof activeChild === 'string' ? this.getNode(activeChild) : activeChild;
        if (!parent || !parent.activeChild) {
            return;
        }
        if (!activeChild || parent.activeChild !== activeChild) {
            return;
        }
        var isActiveChildAtCurrentFocusNodeBranch = this.isSameOrParentForChild(activeChild, this.currentFocusNode);
        while (parent && parent.activeChild) {
            var isParentAtActiveChildBranch = parent.activeChild === activeChild;
            var isParentAtCurrentFocusedNodeBranch = this.isSameOrParentForChild(parent.activeChild, this.currentFocusNode);
            if (isActiveChildAtCurrentFocusNodeBranch || (isParentAtActiveChildBranch && !isParentAtCurrentFocusedNodeBranch)) {
                parent.activeChild = undefined;
            }
            activeChild = parent;
            parent = parent.parent;
        }
    };
    /**
     * Sets the current focus of the instance to the given node or node ID.
     *
     * If the given node points to a non-focusable node, we dig down from
     * the given node to find a node that can be focused on.
     *
     * Calls `onFocus` on the given node, if it exists, and emits a `focus` event,
     * also calls `onBlur` on the node that WAS focused before this function was called.
     *
     * @param {string|object} node - node or id of the node to be focused
     */
    Lrud.prototype.assignFocus = function (node) {
        node = typeof node === 'string' ? this.getNode(node) : node;
        // Focus might be assigned to node that is not focusable itself, but
        // contains focusable children, looking for such child
        if (node && !isNodeFocusable(node)) {
            node = this.digDown(node, Directions.UNSPECIFIED);
        }
        if (!node) {
            throw new Error('trying to assign focus to a non focusable node');
        }
        if (this.currentFocusNode) {
            this.emitter.emit('blur', this.currentFocusNode);
            if (this.currentFocusNode.onBlur) {
                this.currentFocusNode.onBlur(this.currentFocusNode);
            }
        }
        this.currentFocusNode = node;
        if (node.parent) {
            this.setActiveChildRecursive(node.parent, node);
        }
        if (node.onFocus) {
            node.onFocus(node);
        }
        this.emitter.emit('focus', node);
    };
    /**
     * If the focus of the tree is out of sync, ie, the current focused node becomes unfocusable,
     * this can be used to fall back to another focus.
     *
     * @param {object} node - node, based on which focus is recalculated
     */
    Lrud.prototype.recalculateFocus = function (node) {
        var topNode = this.climbUp(node, Directions.UNSPECIFIED) || this.getRootNode();
        var nextChild = this.getNextFocusableChildInDirection(topNode, Directions.UNSPECIFIED);
        var focusableNode = this.digDown(nextChild || topNode, Directions.UNSPECIFIED);
        if (focusableNode) {
            this.assignFocus(focusableNode);
        }
        else {
            this.currentFocusNode = undefined;
        }
    };
    /**
     * Given a tree, register all of its nodes into this instance.
     *
     * @param {object} subTreeRootNodeConfig
     */
    Lrud.prototype.registerTree = function (subTreeRootNodeConfig) {
        var _this = this;
        if (!subTreeRootNodeConfig) {
            return;
        }
        traverseNodeSubtree(subTreeRootNodeConfig, function (traversedNodeConfig) {
            _this.registerNode(traversedNodeConfig.id, traversedNodeConfig);
            if (traversedNodeConfig.children) {
                for (var i = 0; i < traversedNodeConfig.children.length; i++) {
                    traversedNodeConfig.children[i].parent = traversedNodeConfig.id;
                }
            }
        });
    };
    /**
     * Given a tree object, attempt to register that tree into the current lrud instance.
     *
     * If the given tree already exists as a branch in the instance tree, the new tree will replace that branch.
     *
     * If the new tree doesn't already exist as a branch in the instance tree, this function will register the new
     * tree as a branch against the root node, as per standard registerNode() behaviour.
     *
     * @param {object} subTreeRootNodeConfig
     * @param {object} [options]
     * @param {boolean} [options.maintainIndex] - if true, and new tree is replacing an existing branch of the tree,
     *                                            maintain the original branches relative index; default: true
     */
    Lrud.prototype.insertTree = function (subTreeRootNodeConfig, options) {
        if (options === void 0) { options = { maintainIndex: true }; }
        if (!subTreeRootNodeConfig) {
            return;
        }
        var nodeToReplace = this.pickNode(subTreeRootNodeConfig.id);
        if (!subTreeRootNodeConfig.parent && nodeToReplace && nodeToReplace.parent) {
            subTreeRootNodeConfig.parent = nodeToReplace.parent.id;
        }
        if (options.maintainIndex && nodeToReplace && typeof nodeToReplace.index === 'number') {
            subTreeRootNodeConfig.index = nodeToReplace.index;
        }
        this.registerTree(subTreeRootNodeConfig);
    };
    /**
     * Checks is node contains children that might be focused (are a focusable candidates).
     * It checks the whole node's children sub-tree, not only direct children.
     *
     * @param {object} node - node, which children are checked against being focusable candidates
     */
    Lrud.prototype.doesNodeHaveFocusableChildren = function (node) {
        if (!node || !node.children) {
            return false;
        }
        var nodeHaveFocusableChildren = false;
        traverseNodeSubtree(node, function (traversedNode) {
            // ignoring when subtree root, we are only interested in children focusability
            if (traversedNode !== node) {
                nodeHaveFocusableChildren = nodeHaveFocusableChildren || isNodeFocusable(traversedNode);
            }
            return nodeHaveFocusableChildren;
        });
        return nodeHaveFocusableChildren;
    };
    /**
     * Checks if node is focusable or contains focusable children.
     *
     * @param {object} node - node to check against being focusable candidate
     */
    Lrud.prototype.isNodeFocusableCandidate = function (node) {
        return isNodeFocusable(node) || this.doesNodeHaveFocusableChildren(node);
    };
    /**
     * Checks if given parent node is a child's parent node or the node itself. If it's a parent it doesn't have
     * to be a direct one, but has to be placed at a path to the root node.
     *
     * E.g.
     *        root
     *        / \
     *       A   B
     *      /     \
     *     AA      BA
     *    /  \
     *  AAA  AAB
     *
     *  Expect:
     *    isSameOrParentForChild('A', 'A') -> true
     *    isSameOrParentForChild('A', 'AA') -> true
     *    isSameOrParentForChild('AA', 'A') -> false
     *    isSameOrParentForChild('A', 'AAA') -> true
     *    isSameOrParentForChild('AAA', 'AA') -> false
     *    isSameOrParentForChild('A', 'BA') -> false
     *    isSameOrParentForChild('BA', 'A') -> false
     *    isSameOrParentForChild('AA', 'BA') -> false
     *    isSameOrParentForChild('BA', 'AA') -> false
     *
     * @param {string|object} parent - parent or id of the examined parent
     * @param {string|object} child - node id of the node which parents are queried
     */
    Lrud.prototype.isSameOrParentForChild = function (parent, child) {
        parent = typeof parent === 'string' ? this.getNode(parent) : parent;
        child = typeof child === 'string' ? this.getNode(child) : child;
        if (!parent || !child) {
            return false;
        }
        if (parent === child) {
            return true;
        }
        while (child) {
            if (child.parent === parent) {
                return true;
            }
            child = child.parent;
        }
        return false;
    };
    /**
     * Changes the ability of a node to be focused in place.
     *
     * @param {string|object} node - node or id of the node, which focusability property is about to be changed
     * @param {boolean} isFocusable - focusability value to set
     */
    Lrud.prototype.setNodeFocusable = function (node, isFocusable) {
        node = typeof node === 'string' ? this.getNode(node) : node;
        if (!node) {
            return;
        }
        var nodeIsFocusable = isNodeFocusable(node);
        if (nodeIsFocusable === isFocusable) {
            return;
        }
        node.isFocusable = isFocusable;
        if (!isFocusable) {
            if (this.currentFocusNode === node) {
                this.recalculateFocus(node);
            }
            if (node.parent) {
                this.unsetActiveChild(node.parent, node);
            }
        }
    };
    return Lrud;
}());




/***/ }),

/***/ 6135:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const lrud_1 = __webpack_require__(7295);
class SpatialNavigator {
  constructor({
    onDirectionHandledWithoutMovementRef = {
      current: () => undefined
    }
  }) {
    this.registerMap = {};
    /**
     * Sometimes we need to focus an element, but it is not registered yet.
     * That's where we put this waiting element.
     */
    this.focusQueue = null;
    /**
     * To handle the default focus, we want to queue the element to be focused.
     * We queue it because it might not be registered yet when it asks for focus.
     *
     * We queue it only if there is no currently focused element already (or currently queued),
     * because multiple elements might try to take the focus (DefaultFocus is a context, so all its children
     * will try to grab it). We only want the first of these element to grab it.
     */
    this.handleOrQueueDefaultFocus = id => {
      if (this.getCurrentFocusNode()) return;
      if (this.focusQueue) return;
      if (this.lrud.getNode(id)) {
        this.lrud.assignFocus(id);
        return;
      }
      this.focusQueue = id;
    };
    /**
     * Sometimes we want to queue focus an element, even if one is already focused.
     * That happens with an imperative focus for example. I can force a focus to an element,
     * even though another one is already focused.
     *
     * Still, I want to queue it, because the element might not be registered yet (example: in the case of virtualized lists)
     */
    this.queueFocus = id => {
      if (this.focusQueue) return;
      this.focusQueue = id;
    };
    /**
     * This will focus the currently queued element if it exists.
     * Otherwise, it will do nothing.
     *
     * This function will eventually be called with the proper element
     * when the element is finally registered.
     */
    this.handleQueuedFocus = () => {
      if (this.focusQueue && this.lrud.getNode(this.focusQueue)) {
        try {
          this.lrud.assignFocus(this.focusQueue);
          this.focusQueue = null;
        } catch (e) {
          // pass
        }
      }
    };
    this.grabFocus = id => {
      return this.lrud.assignFocus(id);
    };
    this.getCurrentFocusNode = () => {
      return this.lrud.currentFocusNode;
    };
    this.lrud = new lrud_1.Lrud();
    this.onDirectionHandledWithoutMovementRef = onDirectionHandledWithoutMovementRef;
  }
  registerNode(...params) {
    var _a;
    try {
      const parent = (_a = params[1]) === null || _a === void 0 ? void 0 : _a.parent;
      const id = params[0];
      // If no parent is given, we are talking about a root node. We want to register it.
      // If a parent is given, we need the node to exist. Otherwise, we'll pass and queue the node for later registration.
      if (parent === undefined || this.lrud.getNode(parent)) {
        this.lrud.registerNode(...params);
        // After we successfully register a node, we need to check whether it needs to grab the focus or not.
        this.handleQueuedFocus();
        // OK, we successfully registered an element.
        // Now, we check if some other elements were depending on us to be registered.
        // ...and we do it recursively.
        const potentialNodesToRegister = this.registerMap[id];
        if (!potentialNodesToRegister || potentialNodesToRegister.length === 0) return;
        potentialNodesToRegister.forEach(node => {
          this.registerNode(...node);
        });
        delete this.registerMap[id];
      } else {
        // If the parent is not registered yet, we queue the node for later registration.
        if (!this.registerMap[parent]) {
          this.registerMap[parent] = [];
        }
        this.registerMap[parent].push(params);
      }
    } catch (e) {
      console.error(e);
    }
  }
  unregisterNode(...params) {
    this.lrud.unregisterNode(...params);
  }
  handleKeyDown(direction) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!direction) return;
      if (!this.hasRootNode) return;
      if (!this.lrud.getRootNode()) return;
      if (direction) {
        const nodeBeforeMovement = this.lrud.getCurrentFocusNode();
        this.lrud.handleKeyEvent({
          direction
        }, {
          forceFocus: true
        });
        const nodeAfterMovement = this.lrud.getCurrentFocusNode();
        if (nodeBeforeMovement === nodeAfterMovement) {
          this.onDirectionHandledWithoutMovementRef.current(direction);
        }
      }
    });
  }
  hasOneNodeFocused() {
    return this.lrud.getCurrentFocusNode() !== undefined;
  }
  get hasRootNode() {
    try {
      this.lrud.getRootNode();
      return true;
    } catch (e) {
      console.warn('[React Spatial Navigation] No registered node on this page.');
      return false;
    }
  }
}
exports["default"] = SpatialNavigator;

/***/ }),

/***/ 3253:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationFocusableView = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const Node_1 = __webpack_require__(6016);
const react_native_1 = __webpack_require__(9925);
const react_1 = __webpack_require__(8156);
const DeviceContext_1 = __webpack_require__(5274);
const useSpatialNavigatorFocusableAccessibilityProps_1 = __webpack_require__(7256);
exports.SpatialNavigationFocusableView = (0, react_1.forwardRef)((_a, ref) => {
  var {
      children,
      style,
      viewProps
    } = _a,
    props = __rest(_a, ["children", "style", "viewProps"]);
  const {
    deviceTypeRef
  } = (0, DeviceContext_1.useSpatialNavigationDeviceType)();
  const nodeRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(ref, () => ({
    focus: () => {
      var _a;
      return (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }), [nodeRef]);
  const webProps = react_native_1.Platform.select({
    web: {
      onMouseEnter: () => {
        var _a;
        if (viewProps === null || viewProps === void 0 ? void 0 : viewProps.onMouseEnter) {
          viewProps === null || viewProps === void 0 ? void 0 : viewProps.onMouseEnter();
        }
        if (deviceTypeRef.current === 'remotePointer') {
          (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
      },
      onClick: () => {
        var _a;
        (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    },
    default: {}
  });
  return (0, jsx_runtime_1.jsx)(Node_1.SpatialNavigationNode, Object.assign({
    isFocusable: true
  }, props, {
    ref: nodeRef,
    children: ({
      isFocused,
      isActive
    }) => (0, jsx_runtime_1.jsx)(InnerFocusableView, {
      viewProps: viewProps,
      webProps: webProps,
      style: style,
      isActive: isActive,
      isFocused: isFocused,
      children: children
    })
  }));
});
exports.SpatialNavigationFocusableView.displayName = 'SpatialNavigationFocusableView';
const InnerFocusableView = (0, react_1.forwardRef)(({
  viewProps,
  webProps,
  children,
  isActive,
  isFocused,
  style
}, ref) => {
  const accessibilityProps = (0, useSpatialNavigatorFocusableAccessibilityProps_1.useSpatialNavigatorFocusableAccessibilityProps)();
  const accessibilityState = (0, react_1.useMemo)(() => ({
    selected: isFocused
  }), [isFocused]);
  return (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({
    ref: ref,
    style: style,
    accessibilityState: accessibilityState
  }, accessibilityProps, viewProps, webProps, {
    children: typeof children === 'function' ? children({
      isFocused,
      isActive
    }) : children
  }));
});
InnerFocusableView.displayName = 'InnerFocusableView';

/***/ }),

/***/ 6016:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationNode = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __importStar(__webpack_require__(8156));
const DefaultFocusContext_1 = __webpack_require__(8178);
const ParentIdContext_1 = __webpack_require__(5814);
const ParentScrollContext_1 = __webpack_require__(1262);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const useUniqueId_1 = __webpack_require__(2551);
const useScrollToNodeIfNeeded = ({
  childRef,
  additionalOffset
}) => {
  const {
    scrollToNodeIfNeeded
  } = (0, ParentScrollContext_1.useSpatialNavigatorParentScroll)();
  return () => scrollToNodeIfNeeded(childRef, additionalOffset);
};
const useBindRefToChild = () => {
  const childRef = (0, react_1.useRef)(null);
  const bindRefToChild = child => {
    return react_1.default.cloneElement(child, Object.assign(Object.assign({}, child.props), {
      ref: node => {
        // We need the reference for our scroll handling
        childRef.current = node;
        // @ts-expect-error @fixme This works at runtime but we couldn't find how to type it properly.
        // Let's check if a ref was given (not by us)
        const {
          ref
        } = child;
        if (typeof ref === 'function') {
          ref(node);
        }
        if ((ref === null || ref === void 0 ? void 0 : ref.current) !== undefined) {
          ref.current = node;
        }
      }
    }));
  };
  return {
    bindRefToChild,
    childRef
  };
};
exports.SpatialNavigationNode = (0, react_1.forwardRef)(({
  onFocus,
  onBlur,
  onSelect,
  onActive,
  onInactive,
  orientation = 'vertical',
  index,
  isFocusable = false,
  alignInGrid = false,
  indexRange,
  children,
  additionalOffset = 0
}, ref) => {
  const spatialNavigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const parentId = (0, ParentIdContext_1.useParentId)();
  const [isFocused, setIsFocused] = (0, react_1.useState)(false);
  const [isActive, setIsActive] = (0, react_1.useState)(false);
  // If parent changes, we have to re-register the Node + all children -> adding the parentId to the nodeId makes the children re-register.
  const id = (0, useUniqueId_1.useUniqueId)({
    prefix: `${parentId}_node_`
  });
  (0, react_1.useImperativeHandle)(ref, () => ({
    focus: () => spatialNavigator.grabFocus(id)
  }), [spatialNavigator, id]);
  const {
    childRef,
    bindRefToChild
  } = useBindRefToChild();
  const scrollToNodeIfNeeded = useScrollToNodeIfNeeded({
    childRef,
    additionalOffset
  });
  /*
   * We don't re-register in LRUD on each render, because LRUD does not allow updating the nodes.
   * Therefore, the SpatialNavigator Node callbacks are registered at 1st render but can change (ie. if props change) afterwards.
   * Since we want the functions to always be up to date, we use a reference to them.
   */
  const currentOnSelect = (0, react_1.useRef)();
  currentOnSelect.current = onSelect;
  const currentOnFocus = (0, react_1.useRef)();
  currentOnFocus.current = () => {
    onFocus === null || onFocus === void 0 ? void 0 : onFocus();
    scrollToNodeIfNeeded();
  };
  const currentOnBlur = (0, react_1.useRef)();
  currentOnBlur.current = onBlur;
  const currentOnActive = (0, react_1.useRef)();
  currentOnActive.current = onActive;
  const currentOnInactive = (0, react_1.useRef)();
  currentOnInactive.current = onInactive;
  const shouldHaveDefaultFocus = (0, DefaultFocusContext_1.useSpatialNavigatorDefaultFocus)();
  (0, react_1.useEffect)(() => {
    spatialNavigator.registerNode(id, {
      parent: parentId,
      isFocusable,
      onBlur: () => {
        var _a;
        (_a = currentOnBlur.current) === null || _a === void 0 ? void 0 : _a.call(currentOnBlur);
        setIsFocused(false);
      },
      onFocus: () => {
        var _a;
        (_a = currentOnFocus.current) === null || _a === void 0 ? void 0 : _a.call(currentOnFocus);
        setIsFocused(true);
      },
      onSelect: () => {
        var _a;
        return (_a = currentOnSelect.current) === null || _a === void 0 ? void 0 : _a.call(currentOnSelect);
      },
      orientation,
      index,
      isIndexAlign: alignInGrid,
      indexRange,
      onActive: () => {
        var _a;
        (_a = currentOnActive.current) === null || _a === void 0 ? void 0 : _a.call(currentOnActive);
        setIsActive(true);
      },
      onInactive: () => {
        var _a;
        (_a = currentOnInactive.current) === null || _a === void 0 ? void 0 : _a.call(currentOnInactive);
        setIsActive(false);
      }
    });
    return () => spatialNavigator.unregisterNode(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
  }, [parentId]);
  (0, react_1.useEffect)(() => {
    if (shouldHaveDefaultFocus && isFocusable && !spatialNavigator.hasOneNodeFocused()) {
      spatialNavigator.handleOrQueueDefaultFocus(id);
    }
  }, [id, isFocusable, shouldHaveDefaultFocus, spatialNavigator]);
  return (0, jsx_runtime_1.jsx)(ParentIdContext_1.ParentIdContext.Provider, {
    value: id,
    children: typeof children === 'function' ? bindRefToChild(children({
      isFocused,
      isActive
    })) : children
  });
});
exports.SpatialNavigationNode.displayName = 'SpatialNavigationNode';

/***/ }),

/***/ 1635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationRoot = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const ParentIdContext_1 = __webpack_require__(5814);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const useCreateSpatialNavigator_1 = __webpack_require__(3267);
const useRemoteControl_1 = __webpack_require__(7111);
const LockSpatialNavigationContext_1 = __webpack_require__(5748);
const ROOT_ID = 'root';
const SpatialNavigationRoot = ({
  isActive = true,
  onDirectionHandledWithoutMovement = () => undefined,
  children
}) => {
  // We can't follow the react philosophy here: we can't recreate a navigator if this function changes
  // so we'll have to store its ref and update the ref if there is a new value to this function
  const onDirectionHandledWithoutMovementRef = (0, react_1.useRef)(() => undefined);
  // Update the ref at every render
  onDirectionHandledWithoutMovementRef.current = onDirectionHandledWithoutMovement;
  const spatialNavigator = (0, useCreateSpatialNavigator_1.useCreateSpatialNavigator)({
    onDirectionHandledWithoutMovementRef
  });
  const {
    isLocked,
    lockActions
  } = (0, LockSpatialNavigationContext_1.useIsLocked)();
  (0, useRemoteControl_1.useRemoteControl)({
    spatialNavigator,
    isActive: isActive && !isLocked
  });
  (0, react_1.useEffect)(() => {
    spatialNavigator.registerNode(ROOT_ID, {
      orientation: 'vertical'
    });
    return () => spatialNavigator.unregisterNode(ROOT_ID);
  }, [spatialNavigator]);
  return (0, jsx_runtime_1.jsx)(SpatialNavigatorContext_1.SpatialNavigatorContext.Provider, {
    value: spatialNavigator,
    children: (0, jsx_runtime_1.jsx)(LockSpatialNavigationContext_1.LockSpatialNavigationContext.Provider, {
      value: lockActions,
      children: (0, jsx_runtime_1.jsx)(ParentIdContext_1.ParentIdContext.Provider, {
        value: ROOT_ID,
        children: children
      })
    })
  });
};
exports.SpatialNavigationRoot = SpatialNavigationRoot;

/***/ }),

/***/ 1334:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationScrollView = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __importStar(__webpack_require__(8156));
const react_native_1 = __webpack_require__(9925);
const ParentScrollContext_1 = __webpack_require__(1262);
const scrollToNewlyfocusedElement_1 = __webpack_require__(6909);
const DeviceContext_1 = __webpack_require__(5274);
const useRemotePointerScrollviewScrollProps = ({
  pointerScrollSpeed,
  scrollY,
  scrollViewRef
}) => {
  const {
    deviceType,
    deviceTypeRef,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId
  } = (0, DeviceContext_1.useSpatialNavigationDeviceType)();
  const onMouseEnterTop = (0, react_1.useCallback)(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        var _a;
        currentScrollPosition -= pointerScrollSpeed;
        (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
          y: currentScrollPosition,
          animated: false
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceTypeRef, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);
  const onMouseEnterBottom = (0, react_1.useCallback)(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        var _a;
        currentScrollPosition += pointerScrollSpeed;
        (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
          y: currentScrollPosition,
          animated: false
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceTypeRef, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);
  const onMouseLeave = (0, react_1.useCallback)(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      const intervalId = getScrollingId();
      if (intervalId) {
        clearInterval(intervalId);
        setScrollingId(null);
      }
    }
  }, [deviceTypeRef, getScrollingId, setScrollingId]);
  const ascendingArrowProps = (0, react_1.useMemo)(() => react_native_1.Platform.select({
    web: {
      onMouseEnter: onMouseEnterBottom,
      onMouseLeave: onMouseLeave
    }
  }), [onMouseEnterBottom, onMouseLeave]);
  const descendingArrowProps = (0, react_1.useMemo)(() => react_native_1.Platform.select({
    web: {
      onMouseEnter: onMouseEnterTop,
      onMouseLeave: onMouseLeave
    }
  }), [onMouseEnterTop, onMouseLeave]);
  return {
    deviceType,
    deviceTypeRef,
    ascendingArrowProps,
    descendingArrowProps
  };
};
const getNodeRef = node => {
  if (react_native_1.Platform.OS === 'web') {
    return node === null || node === void 0 ? void 0 : node.getInnerViewNode();
  }
  return node;
};
const SpatialNavigationScrollView = ({
  horizontal = false,
  style,
  offsetFromStart = 0,
  children,
  ascendingArrow,
  ascendingArrowContainerStyle,
  descendingArrow,
  descendingArrowContainerStyle,
  pointerScrollSpeed = 10
}) => {
  const {
    scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded
  } = (0, ParentScrollContext_1.useSpatialNavigatorParentScroll)();
  const scrollViewRef = (0, react_1.useRef)(null);
  const scrollY = (0, react_1.useRef)(0);
  const {
    ascendingArrowProps,
    descendingArrowProps,
    deviceType,
    deviceTypeRef
  } = useRemotePointerScrollviewScrollProps({
    pointerScrollSpeed,
    scrollY,
    scrollViewRef
  });
  const scrollToNode = (0, react_1.useCallback)((newlyFocusedElementRef, additionalOffset = 0) => {
    var _a;
    try {
      if (deviceTypeRef.current === 'remoteKeys') {
        (_a = newlyFocusedElementRef === null || newlyFocusedElementRef === void 0 ? void 0 : newlyFocusedElementRef.current) === null || _a === void 0 ? void 0 : _a.measureLayout(getNodeRef(scrollViewRef === null || scrollViewRef === void 0 ? void 0 : scrollViewRef.current), (left, top) => (0, scrollToNewlyfocusedElement_1.scrollToNewlyFocusedElement)({
          newlyFocusedElementDistanceToLeftRelativeToLayout: left,
          newlyFocusedElementDistanceToTopRelativeToLayout: top,
          horizontal,
          offsetFromStart: offsetFromStart + additionalOffset,
          scrollViewRef
        }), () => {});
      }
    } catch (_b) {
      // A crash can happen when calling measureLayout when a page unmounts. No impact on focus detected in regular use cases.
    }
    makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef, additionalOffset); // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
  }, [makeParentsScrollToNodeIfNeeded, horizontal, offsetFromStart, deviceTypeRef]);
  const onScroll = (0, react_1.useCallback)(event => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  }, [scrollY]);
  return (0, jsx_runtime_1.jsxs)(ParentScrollContext_1.SpatialNavigatorParentScrollContext.Provider, {
    value: scrollToNode,
    children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, {
      ref: scrollViewRef,
      horizontal: horizontal,
      style: style,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      scrollEnabled: false,
      onScroll: onScroll,
      scrollEventThrottle: 16,
      children: children
    }), deviceType === 'remotePointer' ? (0, jsx_runtime_1.jsx)(PointerScrollArrows, {
      descendingArrow: descendingArrow,
      ascendingArrow: ascendingArrow,
      descendingArrowContainerStyle: descendingArrowContainerStyle,
      ascendingArrowContainerStyle: ascendingArrowContainerStyle,
      ascendingArrowProps: ascendingArrowProps,
      descendingArrowProps: descendingArrowProps
    }) : undefined]
  });
};
exports.SpatialNavigationScrollView = SpatialNavigationScrollView;
const PointerScrollArrows = react_1.default.memo(({
  ascendingArrow,
  descendingArrowProps,
  ascendingArrowContainerStyle,
  descendingArrow,
  ascendingArrowProps,
  descendingArrowContainerStyle
}) => {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({
      style: [styles.arrowContainer, descendingArrowContainerStyle]
    }, descendingArrowProps, {
      children: descendingArrow
    })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({
      style: ascendingArrowContainerStyle
    }, ascendingArrowProps, {
      children: ascendingArrow
    }))]
  });
});
PointerScrollArrows.displayName = 'PointerScrollArrows';
const styles = react_native_1.StyleSheet.create({
  arrowContainer: {
    position: 'absolute'
  }
});

/***/ }),

/***/ 755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationView = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_native_1 = __webpack_require__(9925);
const Node_1 = __webpack_require__(6016);
const react_1 = __webpack_require__(8156);
exports.SpatialNavigationView = (0, react_1.forwardRef)(({
  direction = 'horizontal',
  alignInGrid = false,
  children,
  style,
  index
}, ref) => {
  return (0, jsx_runtime_1.jsx)(Node_1.SpatialNavigationNode, {
    index: index,
    orientation: direction,
    alignInGrid: alignInGrid,
    ref: ref,
    children: (0, jsx_runtime_1.jsx)(react_native_1.View, {
      style: [style, direction === 'horizontal' ? styles.viewHorizontal : styles.viewVertical],
      children: children
    })
  });
});
exports.SpatialNavigationView.displayName = 'SpatialNavigationView';
const styles = react_native_1.StyleSheet.create({
  viewVertical: {
    display: 'flex',
    flexDirection: 'column'
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row'
  }
});

/***/ }),

/***/ 6975:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationVirtualizedGrid = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __importStar(__webpack_require__(8156));
const react_native_1 = __webpack_require__(9925);
const range_1 = __importDefault(__webpack_require__(2689));
const SpatialNavigationVirtualizedList_1 = __webpack_require__(4040);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const ParentIdContext_1 = __webpack_require__(5814);
const TypedMemo_1 = __webpack_require__(9643);
const convertToGrid_1 = __webpack_require__(9816);
const useRegisterGridRowVirtualNodes = ({
  numberOfColumns
}) => {
  const spatialNavigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const parentId = (0, ParentIdContext_1.useParentId)();
  const getNthVirtualNodeID = (0, react_1.useCallback)(index => `${parentId}_${index}`, [parentId]);
  // This function must be idempotent so we don't register existing nodes again when grid data changes
  const registerNthVirtualNode = (0, react_1.useCallback)(index => {
    return spatialNavigator.registerNode(getNthVirtualNodeID(index), {
      parent: parentId,
      orientation: 'horizontal',
      isFocusable: false,
      /** This prop enables index synchronization for navigation between rows.
       * Thus you can navigate up and down inside columns, instead of going back to the first element of rows.
       */
      useMeForIndexAlign: true
    });
  }, [spatialNavigator, parentId, getNthVirtualNodeID]);
  const unregisterNthVirtualNode = (0, react_1.useCallback)(index => {
    return spatialNavigator.unregisterNode(getNthVirtualNodeID(index));
  }, [spatialNavigator, getNthVirtualNodeID]);
  (0, react_1.useEffect)(() => {
    (0, range_1.default)(numberOfColumns).forEach(i => registerNthVirtualNode(i));
    return () => (0, range_1.default)(numberOfColumns).forEach(i => unregisterNthVirtualNode(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
  }, [parentId]);
  return {
    getNthVirtualNodeID
  };
};
const ItemWrapperWithVirtualParentContext = (0, TypedMemo_1.typedMemo)(({
  virtualParentID,
  item,
  renderItem
}) => (0, jsx_runtime_1.jsx)(ParentIdContext_1.ParentIdContext.Provider, {
  value: virtualParentID,
  children: renderItem({
    item
  })
}));
ItemWrapperWithVirtualParentContext.displayName = 'ItemWrapperWithVirtualParentContext';
const GridRow = ({
  renderItem,
  numberOfColumns,
  row,
  rowContainerStyle
}) => {
  const {
    getNthVirtualNodeID
  } = useRegisterGridRowVirtualNodes({
    numberOfColumns
  });
  return (0, jsx_runtime_1.jsx)(HorizontalContainer, {
    style: rowContainerStyle,
    children: row.items.map((item, index) => {
      return (/* This view is important to reset flex direction to vertical */
        (0, jsx_runtime_1.jsx)(react_native_1.View, {
          children: (0, jsx_runtime_1.jsx)(ItemWrapperWithVirtualParentContext, {
            virtualParentID: getNthVirtualNodeID(index),
            renderItem: renderItem,
            item: item
          })
        }, index)
      );
    })
  });
};
/**
 * Use this component to render spatially navigable grids of items.
 * Grids only support vertical orientation (vertically scrollable),
 * but you can navigate between elements in any direction.
 *
 * A grid is a series of horizontal rows rendering 'numberOfColumns' items.
 *
 * ```
 * ┌───────────────────────────────────────────────────┐
 * │                  Screen                           │
 * │                                                   │
 * │ ┌───────────────────────────────────────────────┐ │
 * │ │ Row1                                          │ │
 * │ │                                               │ │
 * │ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ │  A   │ │  B   │ │  C   │ │  D   │ │   E  │  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │ │
 * │ │                                               │ │
 * │ └───────────────────────────────────────────────┘ │
 * │                                                   │
 * │ ┌───────────────────────────────────────────────┐ │
 * │ │ Row2                                          │ │
 * │ │                                               │ │
 * │ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ │   A  │ │  B   │ │  C   │ │  D   │ │  E   │  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │ │
 * │ │                                               │ │
 * │ └───────────────────────────────────────────────┘ │
 * │                                                   │
 * └───────────────────────────────────────────────────┘
 *   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
 *     Row3                                          │
 *   │
 *     ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
 *   │ │      │ │      │ │      │ │      │ │      │
 *     │   A  │ │  B   │ │  C   │ │  D   │ │  E   │  │
 *   │ │      │ │      │ │      │ │      │ │      │
 *     └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
 *   │
 *   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
 * ```
 * The row framed in dotted lines corresponds to a virtualized component.
 * There is no virtualization inside rows.
 */
exports.SpatialNavigationVirtualizedGrid = (0, TypedMemo_1.typedMemo)(_a => {
  var {
      renderItem,
      data,
      numberOfColumns,
      itemHeight,
      header,
      headerSize,
      numberOfRenderedRows,
      numberOfRowsVisibleOnScreen,
      onEndReachedThresholdRowsNumber,
      nbMaxOfItems,
      rowContainerStyle
    } = _a,
    props = __rest(_a, ["renderItem", "data", "numberOfColumns", "itemHeight", "header", "headerSize", "numberOfRenderedRows", "numberOfRowsVisibleOnScreen", "onEndReachedThresholdRowsNumber", "nbMaxOfItems", "rowContainerStyle"]);
  if (header && !headerSize) throw new Error('You must provide a headerSize when using a header');
  if (headerSize && !header) throw new Error('You must provide a header when using a headerSize');
  const hasHeader = !!header && !!headerSize;
  const gridRows = (0, react_1.useMemo)(() => (0, convertToGrid_1.convertToGrid)(data, numberOfColumns, header), [data, header, numberOfColumns]);
  const gridRowsWithHeaderIfProvided = (0, react_1.useMemo)(() => hasHeader ? [header, ...gridRows] : gridRows, [hasHeader, header, gridRows]);
  const itemSizeAsAFunction = (0, react_1.useCallback)(item => {
    if (hasHeader && react_1.default.isValidElement(item)) {
      return headerSize;
    }
    return itemHeight;
  }, [hasHeader, headerSize, itemHeight]);
  const itemSize = hasHeader ? itemSizeAsAFunction : itemHeight;
  const renderRow = (0, react_1.useCallback)(({
    item: row
  }) => (0, jsx_runtime_1.jsx)(GridRow, {
    renderItem: renderItem,
    numberOfColumns: numberOfColumns,
    row: row,
    rowContainerStyle: rowContainerStyle
  }), [renderItem, numberOfColumns, rowContainerStyle]);
  const renderHeaderThenRows = (0, react_1.useCallback)(({
    item
  }) => {
    if (react_1.default.isValidElement(item)) {
      return item;
    }
    return renderRow({
      item: item
    });
  }, [renderRow]);
  return (0, jsx_runtime_1.jsx)(SpatialNavigationVirtualizedList_1.SpatialNavigationVirtualizedList, Object.assign({
    data: gridRowsWithHeaderIfProvided,
    itemSize: itemSize,
    numberOfRenderedItems: numberOfRenderedRows,
    numberOfItemsVisibleOnScreen: numberOfRowsVisibleOnScreen,
    onEndReachedThresholdItemsNumber: onEndReachedThresholdRowsNumber,
    orientation: "vertical",
    nbMaxOfItems: nbMaxOfItems ? Math.ceil(nbMaxOfItems / numberOfColumns) : undefined,
    renderItem: renderHeaderThenRows,
    isGrid: true
  }, props));
});
exports.SpatialNavigationVirtualizedGrid.displayName = 'SpatialNavigationVirtualizedGrid';
const HorizontalContainer = ({
  style,
  children
}) => {
  return (0, jsx_runtime_1.jsx)(react_native_1.View, {
    style: [style, styles.rowContainer],
    children: children
  });
};
const styles = react_native_1.StyleSheet.create({
  rowContainer: {
    flexDirection: 'row'
  }
});

/***/ }),

/***/ 9816:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.invertOrientation = exports.convertToGrid = void 0;
const chunk_1 = __importDefault(__webpack_require__(3586));
const convertToGrid = (data, numberOfColumns, header) => {
  const rows = (0, chunk_1.default)(data, numberOfColumns);
  return rows.map((items, index) => {
    //We do this to have index taking into account the header
    const computedIndex = header ? index + 1 : index;
    return {
      items,
      index: computedIndex
    };
  });
};
exports.convertToGrid = convertToGrid;
const invertOrientation = orientation => orientation === 'vertical' ? 'horizontal' : 'vertical';
exports.invertOrientation = invertOrientation;

/***/ }),

/***/ 4040:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationVirtualizedList = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const Node_1 = __webpack_require__(6016);
const SpatialNavigationVirtualizedListWithScroll_1 = __webpack_require__(3425);
const TypedMemo_1 = __webpack_require__(9643);
const addIndex_1 = __webpack_require__(5674);
const TypedForwardRef_1 = __webpack_require__(9839);
/**
 * Use this component to render horizontally or vertically virtualized lists with spatial navigation
 * This component wraps the virtualized list inside a parent navigation node.
 * */
exports.SpatialNavigationVirtualizedList = (0, TypedMemo_1.typedMemo)((0, TypedForwardRef_1.typedForwardRef)((props, ref) => {
  var _a, _b;
  const indexedData = (0, react_1.useMemo)(() => (0, addIndex_1.addIndex)(props.data), [props.data]);
  return (0, jsx_runtime_1.jsx)(Node_1.SpatialNavigationNode, {
    alignInGrid: (_a = props.isGrid) !== null && _a !== void 0 ? _a : false,
    orientation: (_b = props.orientation) !== null && _b !== void 0 ? _b : 'horizontal',
    children: (0, jsx_runtime_1.jsx)(SpatialNavigationVirtualizedListWithScroll_1.SpatialNavigationVirtualizedListWithScroll, Object.assign({}, props, {
      data: indexedData,
      ref: ref
    }))
  });
}));
exports.SpatialNavigationVirtualizedList.displayName = 'SpatialNavigationVirtualizedList';

/***/ }),

/***/ 3425:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationVirtualizedListWithScroll = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const SpatialNavigationVirtualizedListWithVirtualNodes_1 = __webpack_require__(9568);
const ParentScrollContext_1 = __webpack_require__(1262);
const TypedMemo_1 = __webpack_require__(9643);
const DeviceContext_1 = __webpack_require__(5274);
const react_native_1 = __webpack_require__(9925);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const react_2 = __importDefault(__webpack_require__(8156));
const TypedForwardRef_1 = __webpack_require__(9839);
const ItemWrapperWithScrollContext = (0, TypedMemo_1.typedMemo)(({
  setCurrentlyFocusedItemIndex,
  item,
  renderItem
}) => {
  const {
    scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded
  } = (0, ParentScrollContext_1.useSpatialNavigatorParentScroll)();
  const scrollToItem = (0, react_1.useCallback)((newlyFocusedElementRef, additionalOffset) => {
    setCurrentlyFocusedItemIndex(item.index);
    // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
    makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef, additionalOffset);
  }, [makeParentsScrollToNodeIfNeeded, setCurrentlyFocusedItemIndex, item.index]);
  return (0, jsx_runtime_1.jsx)(ParentScrollContext_1.SpatialNavigatorParentScrollContext.Provider, {
    value: scrollToItem,
    children: renderItem({
      item
    })
  });
});
ItemWrapperWithScrollContext.displayName = 'ItemWrapperWithScrollContext';
const useRemotePointerVirtualizedListScrollProps = ({
  setCurrentlyFocusedItemIndex,
  scrollInterval,
  data
}) => {
  const {
    deviceType,
    deviceTypeRef,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId
  } = (0, DeviceContext_1.useSpatialNavigationDeviceType)();
  const navigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const idRef = (0, react_1.useRef)(null);
  const grabFocus = navigator.grabFocus;
  const onMouseEnterDescending = (0, react_1.useCallback)(() => {
    const callback = () => {
      setCurrentlyFocusedItemIndex(index => {
        if (index > 0) {
          if (idRef.current) grabFocus(idRef.current.getNthVirtualNodeID(index - 1));
          return index - 1;
        } else {
          return index;
        }
      });
    };
    const id = setInterval(() => {
      callback();
    }, scrollInterval);
    setScrollingId(id);
  }, [grabFocus, scrollInterval, setCurrentlyFocusedItemIndex, setScrollingId]);
  const onMouseLeave = (0, react_1.useCallback)(() => {
    const intervalId = getScrollingId();
    if (intervalId) {
      clearInterval(intervalId);
      setScrollingId(null);
    }
  }, [getScrollingId, setScrollingId]);
  const onMouseEnterAscending = (0, react_1.useCallback)(() => {
    const callback = () => {
      setCurrentlyFocusedItemIndex(index => {
        if (index < data.length - 1) {
          if (idRef.current) {
            grabFocus(idRef.current.getNthVirtualNodeID(index + 1));
          }
          return index + 1;
        } else {
          return index;
        }
      });
    };
    const id = setInterval(() => {
      callback();
    }, scrollInterval);
    setScrollingId(id);
  }, [data.length, grabFocus, scrollInterval, setCurrentlyFocusedItemIndex, setScrollingId]);
  const descendingArrowProps = (0, react_1.useMemo)(() => react_native_1.Platform.select({
    web: {
      onMouseEnter: onMouseEnterDescending,
      onMouseLeave: onMouseLeave
    }
  }), [onMouseEnterDescending, onMouseLeave]);
  const ascendingArrowProps = (0, react_1.useMemo)(() => react_native_1.Platform.select({
    web: {
      onMouseEnter: onMouseEnterAscending,
      onMouseLeave: onMouseLeave
    }
  }), [onMouseEnterAscending, onMouseLeave]);
  return {
    descendingArrowProps,
    ascendingArrowProps,
    idRef,
    deviceType,
    deviceTypeRef
  };
};
/**
 * This component wraps every item of a virtualizedList in a scroll handling context.
 */
exports.SpatialNavigationVirtualizedListWithScroll = (0, TypedMemo_1.typedMemo)((0, TypedForwardRef_1.typedForwardRef)((props, ref) => {
  const {
    data,
    renderItem,
    descendingArrow: descendingArrow,
    ascendingArrow: ascendingArrow,
    descendingArrowContainerStyle,
    ascendingArrowContainerStyle,
    scrollInterval = 100
  } = props;
  const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = (0, react_1.useState)(0);
  const spatialNavigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const {
    deviceType,
    deviceTypeRef,
    descendingArrowProps,
    ascendingArrowProps,
    idRef
  } = useRemotePointerVirtualizedListScrollProps({
    setCurrentlyFocusedItemIndex,
    scrollInterval,
    data
  });
  const setCurrentlyFocusedItemIndexCallback = (0, react_1.useCallback)(index => {
    deviceTypeRef.current === 'remoteKeys' ? setCurrentlyFocusedItemIndex(index) : null;
  }, [deviceTypeRef]);
  (0, react_1.useImperativeHandle)(ref, () => ({
    focus: index => __awaiter(void 0, void 0, void 0, function* () {
      setCurrentlyFocusedItemIndex(index);
      if (idRef.current) {
        const newId = idRef.current.getNthVirtualNodeID(index);
        spatialNavigator.queueFocus(newId);
      }
    })
  }), [idRef, spatialNavigator]);
  const renderWrappedItem = (0, react_1.useCallback)(({
    item
  }) => (0, jsx_runtime_1.jsx)(ItemWrapperWithScrollContext, {
    setCurrentlyFocusedItemIndex: setCurrentlyFocusedItemIndexCallback,
    renderItem: renderItem,
    item: item
  }), [setCurrentlyFocusedItemIndexCallback, renderItem]);
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [(0, jsx_runtime_1.jsx)(SpatialNavigationVirtualizedListWithVirtualNodes_1.SpatialNavigationVirtualizedListWithVirtualNodes, Object.assign({}, props, {
      getNodeIdRef: idRef,
      currentlyFocusedItemIndex: currentlyFocusedItemIndex,
      renderItem: renderWrappedItem
    })), deviceType === 'remotePointer' ? (0, jsx_runtime_1.jsx)(PointerScrollArrows, {
      descendingArrowContainerStyle: descendingArrowContainerStyle,
      descendingArrowProps: descendingArrowProps,
      descendingArrow: descendingArrow,
      ascendingArrowContainerStyle: ascendingArrowContainerStyle,
      ascendingArrowProps: ascendingArrowProps,
      ascendingArrow: ascendingArrow
    }) : undefined]
  });
}));
exports.SpatialNavigationVirtualizedListWithScroll.displayName = 'SpatialNavigationVirtualizedListWithScroll';
const PointerScrollArrows = react_2.default.memo(({
  ascendingArrow,
  ascendingArrowProps,
  ascendingArrowContainerStyle,
  descendingArrow,
  descendingArrowProps,
  descendingArrowContainerStyle
}) => {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({
      style: descendingArrowContainerStyle
    }, descendingArrowProps, {
      children: descendingArrow
    })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({
      style: ascendingArrowContainerStyle
    }, ascendingArrowProps, {
      children: ascendingArrow
    }))]
  });
});
PointerScrollArrows.displayName = 'PointerScrollArrows';

/***/ }),

/***/ 9568:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigationVirtualizedListWithVirtualNodes = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const lodash_uniqueid_1 = __importDefault(__webpack_require__(2120));
const react_1 = __webpack_require__(8156);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const ParentIdContext_1 = __webpack_require__(5814);
const updateVirtualNodeRegistration_1 = __webpack_require__(8825);
const TypedMemo_1 = __webpack_require__(9643);
const useCachedValues_1 = __webpack_require__(9784);
const convertToGrid_1 = __webpack_require__(9816);
const VirtualizedListWithSize_1 = __webpack_require__(5429);
const useCreateVirtualParentsIds = parentId => (0, useCachedValues_1.useCachedValues)(() => (0, lodash_uniqueid_1.default)(`${parentId}_virtual_`));
/**
 * Hook which will :
 * - register the initial virtualNodes
 * - unregister the final virtualNodes
 * Do it each time the parentId is changing
 */
const useRegisterInitialAndUnregisterFinalVirtualNodes = ({
  allItems,
  parentId,
  registerNthVirtualNode,
  unregisterNthVirtualNode
}) => {
  /** We don't unregister the nodes on each render because we want to update them instead (add new ones, move existing ones...).
   * We register each item in allItems at 1st render, and unregister all the registered nodes on unmount.
   * If data was added to allItems in the meantime (ex: onEndReached), the cleanup function needs to have "access" to this additional data in order to unregister the additional nodes.
   * This means the cleanup function needs to have access to up-to-date data, so we use a reference to the list of data. */
  const currentAllItems = (0, react_1.useRef)(allItems);
  currentAllItems.current = allItems;
  (0, react_1.useEffect)(() => {
    currentAllItems.current.forEach((_, n) => registerNthVirtualNode(n));
    return () => currentAllItems.current.forEach((_, n) => unregisterNthVirtualNode(n));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
  }, [parentId]);
};
const useUpdateRegistration = ({
  allItems,
  registerNthVirtualNode
}) => {
  const previousAllItems = (0, react_1.useRef)();
  // useBeforeMountEffect done every time allItems is changing to change the way the allItems is register in the spatialNavigator
  (0, react_1.useEffect)(() => {
    const previousAllItemsList = previousAllItems.current;
    const isFirstRender = previousAllItemsList === undefined;
    if (!isFirstRender) {
      (0, updateVirtualNodeRegistration_1.updateVirtualNodeRegistration)({
        currentItems: allItems,
        previousItems: previousAllItemsList,
        addVirtualNode: registerNthVirtualNode
      });
    }
    previousAllItems.current = allItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
  }, [allItems]);
};
const useRegisterVirtualNodes = ({
  allItems,
  orientation,
  isGrid
}) => {
  const spatialNavigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const parentId = (0, ParentIdContext_1.useParentId)();
  const getNthVirtualNodeID = useCreateVirtualParentsIds(parentId);
  // invert the orientation of children in grids so we can register rows in columns in rows, etc...
  const nodeOrientation = isGrid ? (0, convertToGrid_1.invertOrientation)(orientation) : 'vertical';
  const registerNthVirtualNode = (0, react_1.useCallback)(index => {
    return spatialNavigator.registerNode(getNthVirtualNodeID(index), {
      parent: parentId,
      orientation: nodeOrientation,
      isFocusable: false
    });
  }, [getNthVirtualNodeID, parentId, spatialNavigator, nodeOrientation]);
  const unregisterNthVirtualNode = (0, react_1.useCallback)(index => spatialNavigator.unregisterNode(getNthVirtualNodeID(index)), [getNthVirtualNodeID, spatialNavigator]);
  useRegisterInitialAndUnregisterFinalVirtualNodes({
    allItems,
    parentId,
    registerNthVirtualNode,
    unregisterNthVirtualNode
  });
  useUpdateRegistration({
    allItems,
    registerNthVirtualNode
  });
  return {
    getNthVirtualNodeID
  };
};
const ItemWrapperWithVirtualParentContext = (0, TypedMemo_1.typedMemo)(({
  virtualParentID,
  item,
  renderItem
}) => (0, jsx_runtime_1.jsx)(ParentIdContext_1.ParentIdContext.Provider, {
  value: virtualParentID,
  children: renderItem({
    item
  })
}));
ItemWrapperWithVirtualParentContext.displayName = 'ItemWrapperWithVirtualParentContext';
/**
 * This component wraps every item of the VirtualizedList inside a Virtual Node.
 *
 * Virtual Nodes make the list more resilient to data changes.
 *
 * If the data changes, virtual nodes always wrap each elements for the spatial navigator to never lose track of the elements.
 * The strategy is to have as many virtual LRUD nodes as the amount data. For a N length array, we have N virtualized nodes. Even after pagination.
 * These virtual nodes are really helpful to never lose track of the navigation, especially if there is a refresh of the data and the array is shuffled.
 * ```
 *                       ┌───────────────────────────────────────┐
 *                       │                Screen                 │
 *                       │                                       │
 *                       │                                       │
 * ┌─────┐  ┌─────┐  ┌───┼─┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ │┌─────┐  ┌─────┐
 * │  1  │  │  2  │  │  3│ │  │  4  │  │  5  │  │  6  │  │  7  │ ││  8  │  │  9  │
 * │     │  │┌───┐│  │┌──┼┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│ ││┌───┐│  │     │
 * │  A  │  ││ B ││  ││ C│││  ││ D ││  ││ E ││  ││ F ││  ││ G ││ │││ H ││  │  I  │
 * │     │  │└───┘│  │└──┼┘│  │└───┘│  │└───┘│  │└───┘│  │└───┘│ ││└───┘│  │     │
 * └─────┘  └─────┘  └───┼─┘  └─────┘  └─────┘  └─────┘  └─────┘ │└─────┘  └─────┘
 *                       │                                       │
 *                       └───────────────────────────────────────┘
 * ```
 * Framed letters correspond to rendered components.
 */
exports.SpatialNavigationVirtualizedListWithVirtualNodes = (0, TypedMemo_1.typedMemo)(props => {
  var _a, _b;
  const {
    getNthVirtualNodeID
  } = useRegisterVirtualNodes({
    allItems: props.data,
    orientation: (_a = props.orientation) !== null && _a !== void 0 ? _a : 'horizontal',
    isGrid: (_b = props.isGrid) !== null && _b !== void 0 ? _b : false
  });
  (0, react_1.useImperativeHandle)(props.getNodeIdRef, () => ({
    getNthVirtualNodeID: getNthVirtualNodeID
  }), [getNthVirtualNodeID]);
  const {
    renderItem
  } = props;
  const renderWrappedItem = (0, react_1.useCallback)(({
    item
  }) => (0, jsx_runtime_1.jsx)(ItemWrapperWithVirtualParentContext, {
    virtualParentID: getNthVirtualNodeID(item.index),
    renderItem: renderItem,
    item: item
  }), [getNthVirtualNodeID, renderItem]);
  return (0, jsx_runtime_1.jsx)(VirtualizedListWithSize_1.VirtualizedListWithSize, Object.assign({}, props, {
    renderItem: renderWrappedItem
  }));
});
exports.SpatialNavigationVirtualizedListWithVirtualNodes.displayName = 'SpatialNavigationVirtualizedListWithVirtualNodes';

/***/ }),

/***/ 6823:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.VirtualizedList = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const react_native_1 = __webpack_require__(9925);
const getRange_1 = __webpack_require__(5113);
const useVirtualizedListAnimation_1 = __webpack_require__(9079);
const TypedMemo_1 = __webpack_require__(9643);
const getLastItemIndex_1 = __webpack_require__(164);
const getSizeInPxFromOneItemToAnother_1 = __webpack_require__(7220);
const createScrollOffsetArray_1 = __webpack_require__(7742);
const useOnEndReached = ({
  numberOfItems,
  range,
  currentlyFocusedItemIndex,
  onEndReachedThresholdItemsNumber,
  onEndReached
}) => {
  (0, react_1.useEffect)(() => {
    if (numberOfItems === 0 || range.end === 0) {
      return;
    }
    if (currentlyFocusedItemIndex === Math.max(numberOfItems - 1 - onEndReachedThresholdItemsNumber, 0)) {
      onEndReached === null || onEndReached === void 0 ? void 0 : onEndReached();
    }
  }, [onEndReached, range.end, currentlyFocusedItemIndex, onEndReachedThresholdItemsNumber, numberOfItems]);
};
const ItemContainerWithAnimatedStyle = (0, TypedMemo_1.typedMemo)(({
  item,
  renderItem,
  itemSize,
  vertical,
  data
}) => {
  const computeOffset = (0, react_1.useCallback)(item => typeof itemSize === 'number' ? item.index * itemSize : data.slice(0, item.index).reduce((acc, item) => acc + itemSize(item), 0), [data, itemSize]);
  const style = (0, react_1.useMemo)(() => react_native_1.StyleSheet.flatten([styles.item, vertical ? {
    transform: [{
      translateY: computeOffset(item)
    }]
  } : {
    transform: [{
      translateX: computeOffset(item)
    }]
  }]), [computeOffset, item, vertical]);
  return (0, jsx_runtime_1.jsx)(react_native_1.View, {
    style: style,
    children: renderItem({
      item
    })
  });
});
ItemContainerWithAnimatedStyle.displayName = 'ItemContainerWithAnimatedStyle';
/**
 * DO NOT use this component directly !
 * You should use the component SpatialNavigationVirtualizedList.tsx to render navigable lists of components.
 *
 * Why this has been made:
 *   - it gives us full control on the way we scroll (using CSS animations)
 *   - it is way more performant than a FlatList
 */
exports.VirtualizedList = (0, TypedMemo_1.typedMemo)(({
  data,
  renderItem,
  itemSize,
  currentlyFocusedItemIndex,
  numberOfRenderedItems,
  numberOfItemsVisibleOnScreen,
  onEndReached,
  onEndReachedThresholdItemsNumber = 3,
  style,
  orientation = 'horizontal',
  nbMaxOfItems,
  keyExtractor,
  scrollDuration = 200,
  listSizeInPx,
  scrollBehavior = 'stick-to-start',
  testID
}) => {
  const range = (0, getRange_1.getRange)({
    data,
    currentlyFocusedItemIndex,
    numberOfRenderedItems,
    numberOfItemsVisibleOnScreen
  });
  const vertical = orientation === 'vertical';
  const totalVirtualizedListSize = (0, react_1.useMemo)(() => (0, getSizeInPxFromOneItemToAnother_1.getSizeInPxFromOneItemToAnother)(data, itemSize, 0, data.length), [data, itemSize]);
  const dataSliceToRender = data.slice(range.start, range.end + 1);
  const maxPossibleLeftAlignedIndex = (0, getLastItemIndex_1.getLastLeftItemIndex)(data, itemSize, listSizeInPx);
  const maxPossibleRightAlignedIndex = (0, getLastItemIndex_1.getLastRightItemIndex)(data, itemSize, listSizeInPx);
  const allScrollOffsets = (0, react_1.useMemo)(() => (0, createScrollOffsetArray_1.computeAllScrollOffsets)({
    itemSize: itemSize,
    nbMaxOfItems: nbMaxOfItems !== null && nbMaxOfItems !== void 0 ? nbMaxOfItems : data.length,
    numberOfItemsVisibleOnScreen: numberOfItemsVisibleOnScreen,
    scrollBehavior: scrollBehavior,
    data: data,
    listSizeInPx: listSizeInPx,
    maxPossibleLeftAlignedIndex: maxPossibleLeftAlignedIndex,
    maxPossibleRightAlignedIndex: maxPossibleRightAlignedIndex
  }), [data, itemSize, listSizeInPx, maxPossibleLeftAlignedIndex, maxPossibleRightAlignedIndex, nbMaxOfItems, numberOfItemsVisibleOnScreen, scrollBehavior]);
  useOnEndReached({
    numberOfItems: data.length,
    range,
    currentlyFocusedItemIndex,
    onEndReachedThresholdItemsNumber,
    onEndReached
  });
  const animatedStyle = react_native_1.Platform.OS === 'web' ? (0, useVirtualizedListAnimation_1.useWebVirtualizedListAnimation)({
    currentlyFocusedItemIndex,
    vertical,
    scrollDuration,
    scrollOffsetsArray: allScrollOffsets
  }) : (0, useVirtualizedListAnimation_1.useVirtualizedListAnimation)({
    currentlyFocusedItemIndex,
    vertical,
    scrollDuration,
    scrollOffsetsArray: allScrollOffsets
  });
  /*
   * This is a performance trick.
   * This custom key with a modulo is actually a "recycled" list implementation.
   *
   * Normally, if I scroll right, the first element needs to be unmounted and a new one needs to be mounted on the right side.
   * But with recycling, the first element won't be unmounted : it is moved to the end and its props are updated.
   * See https://medium.com/@moshe_31114/building-our-recycle-list-solution-in-react-17a21a9605a0  */
  const recycledKeyExtractor = (0, react_1.useCallback)(index => `recycled_item_${index % numberOfRenderedItems}`, [numberOfRenderedItems]);
  const directionStyle = (0, react_1.useMemo)(() => ({
    flexDirection: vertical ? 'column' : 'row'
  }), [vertical]);
  /**
   * If the view has the size of the screen, then it is dropped in the component hierarchy when scrolled for more than the screen size (scroll right).
   * To ensure that the view stays visible, we adat its size to the size of the virtualized list.
   * ```
   *                        Screen
   *                  ┌─────────────────────┐
   *  View(container) │                     │
   *        ┌─────────┼───────────────────┐ │
   *        │┌─┬─┬─┬─┬┼┬─┬─┬─┬─┬─┬─┬─┬─┬──┤ │
   *        ││┼│ │┼│ │┼│ │┼│ │┼│ │┼│ │┼│  │ │
   *        │└─┴─┴─┴─┴┼┴─┴─┴─┴─┴─┴─┴─┴─┴──┤ │
   *        └─────────┼───────────────────┘ │
   *                  │                     │
   *                  └─────────────────────┘
   *          ◄───────┼───────────────────►
   *   RowWidth = Screen Width + size of the item on left
   * ```
   */
  const dimensionStyle = (0, react_1.useMemo)(() => vertical ? {
    height: totalVirtualizedListSize
  } : {
    width: totalVirtualizedListSize
  }, [totalVirtualizedListSize, vertical]);
  return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, {
    style: [styles.container, animatedStyle, style, directionStyle, dimensionStyle],
    testID: testID,
    children: (0, jsx_runtime_1.jsx)(react_native_1.View, {
      children: dataSliceToRender.map(item => {
        return (0, jsx_runtime_1.jsx)(ItemContainerWithAnimatedStyle, {
          renderItem: renderItem,
          item: item,
          itemSize: itemSize,
          vertical: vertical,
          data: data
        }, keyExtractor ? keyExtractor(item.index) : recycledKeyExtractor(item.index));
      })
    })
  });
});
exports.VirtualizedList.displayName = 'VirtualizedList';
const styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    left: 0,
    position: 'absolute'
  }
});

/***/ }),

/***/ 5429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.VirtualizedListWithSize = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_native_1 = __webpack_require__(9925);
const TypedMemo_1 = __webpack_require__(9643);
const VirtualizedList_1 = __webpack_require__(6823);
const react_1 = __webpack_require__(8156);
/**
 * This component has for only purpose to give to the VirtualizedList its actual
 * width and height. It is used to avoid the VirtualizedList to render with a width
 * or height not defined (as it is used later for computing offsets for example).
 * The size is computed only once and then the VirtualizedList is rendered. This
 * doesn't support dynamic size changes.
 */
exports.VirtualizedListWithSize = (0, TypedMemo_1.typedMemo)(props => {
  const isVertical = props.orientation === 'vertical';
  const [listSizeInPx, setListSizeInPx] = (0, react_1.useState)(isVertical ? react_native_1.Dimensions.get('window').height : react_native_1.Dimensions.get('window').width);
  const [hasAlreadyRendered, setHasAlreadyRendered] = (0, react_1.useState)(false);
  return (0, jsx_runtime_1.jsx)(react_native_1.View, {
    style: style.container,
    onLayout: event => {
      if (!hasAlreadyRendered) {
        const sizeKey = isVertical ? 'height' : 'width';
        if (event.nativeEvent.layout[sizeKey] !== 0) {
          setListSizeInPx(event.nativeEvent.layout[sizeKey]);
          setHasAlreadyRendered(true);
        }
      }
    },
    testID: props.testID ? props.testID + '-size-giver' : undefined,
    children: listSizeInPx ? (0, jsx_runtime_1.jsx)(VirtualizedList_1.VirtualizedList, Object.assign({}, props, {
      listSizeInPx: listSizeInPx
    })) : null
  });
});
exports.VirtualizedListWithSize.displayName = 'VirtualizedListWithSize';
const style = react_native_1.StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
});

/***/ }),

/***/ 5674:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addIndex = void 0;
const addIndex = array => {
  return array.map((value, index) => Object.assign({
    index
  }, value));
};
exports.addIndex = addIndex;

/***/ }),

/***/ 1877:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.computeTranslation = void 0;
const getSizeInPxFromOneItemToAnother_1 = __webpack_require__(7220);
const computeStickToStartTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  data,
  maxPossibleLeftAlignedIndex
}) => {
  const scrollOffset = currentlyFocusedItemIndex < maxPossibleLeftAlignedIndex ? (0, getSizeInPxFromOneItemToAnother_1.getSizeInPxFromOneItemToAnother)(data, itemSizeInPx, 0, currentlyFocusedItemIndex) : (0, getSizeInPxFromOneItemToAnother_1.getSizeInPxFromOneItemToAnother)(data, itemSizeInPx, 0, maxPossibleLeftAlignedIndex);
  return -scrollOffset;
};
const computeStickToEndTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  data,
  listSizeInPx,
  maxPossibleRightAlignedIndex
}) => {
  if (currentlyFocusedItemIndex <= maxPossibleRightAlignedIndex) return -0;
  const currentlyFocusedItemSize = typeof itemSizeInPx === 'function' ? itemSizeInPx(data[currentlyFocusedItemIndex]) : itemSizeInPx;
  const sizeOfListFromStartToCurrentlyFocusedItem = (0, getSizeInPxFromOneItemToAnother_1.getSizeInPxFromOneItemToAnother)(data, itemSizeInPx, 0, currentlyFocusedItemIndex);
  const scrollOffset = sizeOfListFromStartToCurrentlyFocusedItem + currentlyFocusedItemSize - listSizeInPx;
  return -scrollOffset;
};
const computeJumpOnScrollTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen
}) => {
  if (typeof itemSizeInPx === 'function') throw new Error('jump-on-scroll scroll behavior is not supported with dynamic item size');
  const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
  const indexOfItemToFocus = currentlyFocusedItemIndex - currentlyFocusedItemIndex % numberOfItemsVisibleOnScreen;
  const leftAlignedIndex = Math.min(indexOfItemToFocus, maxPossibleLeftAlignedIndex);
  const scrollOffset = leftAlignedIndex * itemSizeInPx;
  return -scrollOffset;
};
const computeTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
  data,
  listSizeInPx,
  maxPossibleLeftAlignedIndex,
  maxPossibleRightAlignedIndex
}) => {
  switch (scrollBehavior) {
    case 'stick-to-start':
      return computeStickToStartTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        data,
        maxPossibleLeftAlignedIndex
      });
    case 'stick-to-end':
      return computeStickToEndTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        data,
        listSizeInPx,
        maxPossibleRightAlignedIndex
      });
    case 'jump-on-scroll':
      return computeJumpOnScrollTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        nbMaxOfItems,
        numberOfItemsVisibleOnScreen
      });
    default:
      throw new Error(`Invalid scroll behavior: ${scrollBehavior}`);
  }
};
exports.computeTranslation = computeTranslation;

/***/ }),

/***/ 7742:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.computeAllScrollOffsets = void 0;
const computeTranslation_1 = __webpack_require__(1877);
/**
 * This function precomputes all scroll offsets
 * It won't move until data moves or the itemSize changes
 */
const computeAllScrollOffsets = ({
  itemSize,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
  data,
  listSizeInPx,
  maxPossibleLeftAlignedIndex,
  maxPossibleRightAlignedIndex
}) => {
  const scrollOffsets = data.map((_, index) => (0, computeTranslation_1.computeTranslation)({
    currentlyFocusedItemIndex: index,
    itemSizeInPx: itemSize,
    nbMaxOfItems: nbMaxOfItems !== null && nbMaxOfItems !== void 0 ? nbMaxOfItems : data.length,
    numberOfItemsVisibleOnScreen: numberOfItemsVisibleOnScreen,
    scrollBehavior: scrollBehavior,
    data: data,
    listSizeInPx: listSizeInPx,
    maxPossibleLeftAlignedIndex: maxPossibleLeftAlignedIndex,
    maxPossibleRightAlignedIndex: maxPossibleRightAlignedIndex
  }));
  return scrollOffsets;
};
exports.computeAllScrollOffsets = computeAllScrollOffsets;

/***/ }),

/***/ 164:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getLastRightItemIndex = exports.getLastLeftItemIndex = void 0;
/**
 * This function is used to compute the index of the last item that allows the end of the list to fully fit in the screen.
 * It is used when scrolling on stick-to-start mode.
 *
 * ```
 *      ┌───────────────────────────────────────┐
 *      │                Screen                 │
 *      │                                       │
 *      │                                       │
 *  ┌───┼─┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ │
 *  │  3│ │  │  4  │  │  5  │  │  6  │  │  7  │ │
 *  │┌──┼┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│ │
 *  ││ C│││  ││ D ││  ││ E ││  ││ F ││  ││ G ││ │
 *  │└──┼┘│  │└───┘│  │└───┘│  │└───┘│  │└───┘│ │
 *  └───┼─┘  └─────┘  └─────┘  └─────┘  └─────┘ │
 *      │                                       │
 *      └───────────────────────────────────────┘
 * ```
 *
 * In this case the last item that allows the end of the list to fully fit in the screen is item 4, so the
 * scroll in stick-to-start mode will be stopped after item 4, to keep
 * item 4 to 7 in the screen.
 *
 */
const getLastLeftItemIndex = (data, itemSizeInPx, listSizeInPx) => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;
    for (let index = data.length - 1; index >= 0; index--) {
      totalSize += itemSizeInPx(data[index]);
      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item (list is iterated backwards, so index + 1)
        return index + 1;
      }
    }
    return 0;
  }
  return data.length - Math.floor(listSizeInPx / itemSizeInPx);
};
exports.getLastLeftItemIndex = getLastLeftItemIndex;
/**
 *
 * This function is used to compute the index of the last item that fits in the screen when at the beginning of a list.
 * It is used when scrolling on stick-to-end mode to know when to start or stop scrolling
 *
 * ```
 *  ┌───────────────────────────────────────┐
 *  │                Screen                 │
 *  │                                       │
 *  │                                       │
 *  │ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─┼───┐
 *  │ │  1  │  │  2  │  │  3  │  │  4  │  │ │5  │
 *  │ │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌┼──┐│
 *  │ ││ A ││  ││ B ││  ││ C ││  ││ D ││  │││E ││
 *  │ │└───┘│  │└───┘│  │└───┘│  │└───┘│  │└┼──┘│
 *  │ └─────┘  └─────┘  └─────┘  └─────┘  └─┼───┘
 *  │                                       │
 *  └───────────────────────────────────────┘
 * ```
 *
 * In this case the last item that fits in the screen is item 4, so the
 * scroll in stick-to-end mode will be computed after item 4, to keep
 * item 5 (and the followings) on the right of the screen.
 *
 */
const getLastRightItemIndex = (data, itemSizeInPx, listSizeInPx) => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;
    for (let index = 0; index < data.length; index++) {
      totalSize += itemSizeInPx(data[index]);
      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item
        return index - 1;
      }
    }
    return data.length - 1;
  }
  // We substract 1 because index starts from 0
  return Math.floor(listSizeInPx / itemSizeInPx) - 1;
};
exports.getLastRightItemIndex = getLastRightItemIndex;

/***/ }),

/***/ 5113:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getRange = void 0;
const positiveValueOrZero = x => Math.max(x, 0);
/**
 * ```
 *                                 numberOfItemsVisibleOnScreen
 *                          <╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴>
 *                          ┌─────────────────────────────────────────┐
 * ┌╴╴╴╴╴╴╴┐     ┌───────┐  │  ╔═══════╗     ┌───────┐     ┌───────┐  │  ┌───────┐     ┌╴╴╴╴╴╴╴┐
 * ╎       ╎     │       │  │  ║       ║     │       │     │       │  │  │       │     ╎       ╎
 * ╎       ╎────►│ start ├──┼─►║focused║────►│       ├────►│       ├──┼─►│  end  ├────►╎       ╎
 * ╎       ╎     │       │  │  ║       ║     │       │     │       │  │  │       │     ╎       ╎
 * └╴╴╴╴╴╴╴┘     └───────┘  │  ╚═══════╝     └───────┘     └───────┘  │  └───────┘     └╴╴╴╴╴╴╴┘
 *                          └─────────────────────────────────────────┘
 *               <╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴>
 *                                     numberOfRenderedItems
 * ```
 **/
const getRangeWithoutFloatHandling = ({
  data,
  currentlyFocusedItemIndex,
  numberOfRenderedItems = 8,
  numberOfItemsVisibleOnScreen
}) => {
  const numberOfItemsNotVisible = numberOfRenderedItems - numberOfItemsVisibleOnScreen;
  /**
   * NumberOfItemsNotVisible should be > 2 in order to be sure to have an element mounted on the left in order to go left
   */
  if (numberOfItemsNotVisible < 2) {
    throw new Error('You have set a numberOfRenderedItems inferior to the numberOfItemsVisibleOnScreen + 2 in your SpatialNavigationVirtualizedList. You must change it.');
  }
  const halfNumberOfItemsNotVisible = numberOfItemsNotVisible / 2;
  const lastDataIndex = data.length - 1;
  const rawStartIndex = currentlyFocusedItemIndex - halfNumberOfItemsNotVisible;
  const rawEndIndex = currentlyFocusedItemIndex + halfNumberOfItemsNotVisible - 1 + numberOfItemsVisibleOnScreen;
  /*
   * if sum does not fit the window size, then we are in of these cases:
   * - at the beginning of the data
   * - at the end of the data
   * - or we have too few data
   */
  if (rawStartIndex < 0) {
    const finalEndIndex = numberOfRenderedItems - 1;
    return {
      start: 0,
      end: positiveValueOrZero(Math.min(finalEndIndex, lastDataIndex))
    };
  }
  if (rawEndIndex > data.length - 1) {
    const finalStartIndex = lastDataIndex - numberOfRenderedItems + 1;
    return {
      start: positiveValueOrZero(finalStartIndex),
      end: positiveValueOrZero(lastDataIndex)
    };
  }
  return {
    start: rawStartIndex,
    end: rawEndIndex
  };
};
/**
 * Computes an array slice for virtualization
 * Have a look at the tests to get examples!
 *
 * The tricky part is that we handle cases were the data is smaller than the window,
 * or when we are on the beginning of the screen...
 */
const getRange = ({
  data,
  currentlyFocusedItemIndex,
  numberOfRenderedItems = 8,
  numberOfItemsVisibleOnScreen
}) => {
  if (numberOfRenderedItems <= 0) {
    console.error('[VirtualizedList] Negative number of rendered items was given, no elements will be rendered');
    return {
      start: 0,
      end: 0
    };
  }
  const result = getRangeWithoutFloatHandling({
    data,
    currentlyFocusedItemIndex,
    numberOfRenderedItems,
    numberOfItemsVisibleOnScreen
  });
  return {
    start: Math.ceil(result.start),
    end: Math.ceil(result.end)
  };
};
exports.getRange = getRange;

/***/ }),

/***/ 7220:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getSizeInPxFromOneItemToAnother = void 0;
/**
 * This function is used to compute the size in pixels of a range of items in a list.
 * If you want the size taken by items from index 0 to 5, you can call this function with
 * start = 0 and end = 5. The size is computed by summing the size of each item in the range.
 * @param data The list of items
 * @param itemSizeInPx The size of an item in pixels. It can be a number or a function that takes an item and returns a number.
 * @param start The start index of the range
 * @param end The end index of the range
 * @returns The size in pixels of the range of items
 **/
const getSizeInPxFromOneItemToAnother = (data, itemSizeInPx, start, end) => {
  if (typeof itemSizeInPx === 'function') {
    return data.slice(start, end).reduce((acc, item) => acc + itemSizeInPx(item), 0);
  }
  return data.slice(start, end).length * itemSizeInPx;
};
exports.getSizeInPxFromOneItemToAnother = getSizeInPxFromOneItemToAnother;

/***/ }),

/***/ 8825:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.updateVirtualNodeRegistration = void 0;
const registerNewNode = ({
  currentItems,
  previousItems,
  addVirtualNode
}) => {
  currentItems.forEach((_, index) => {
    // Currently this is the only way to compare both array and to know which elements to add
    if (index > previousItems.length - 1) {
      addVirtualNode(index);
    }
  });
};
/**
 * This function aims to compare 2 arrays of items : currentItems and previousItems and :
 * - addVirtualNode for every item from currentItems that weren't in previousItems
 * - removeVirtualNode for every item from previousItems that aren't there anymore in currentItems
 * - re-order all the items
 * For now it only does the Step 1.
 */
const updateVirtualNodeRegistration = ({
  currentItems,
  previousItems,
  addVirtualNode
}) => {
  // Step 1 : addVirtualNode for every item from currentItems that weren't in previousItems
  registerNewNode({
    currentItems,
    previousItems,
    addVirtualNode
  });
  // Step 2 : removeVirtualNode for every from previousItems that aren't there anymore in currentItems
  // TODO
  // Step 3 : re-order all the items
  // TODO
};

exports.updateVirtualNodeRegistration = updateVirtualNodeRegistration;

/***/ }),

/***/ 9784:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useCachedValues = void 0;
const react_1 = __webpack_require__(8156);
/**
 * Basically a useMemo for an array that creates elements on the go (not all at the beginning).
 *
 * The input & output might seem similar -> the difference is that
 * - input `nthElementConstructor` always returns a new instance of the Nth element
 * - output`getNthMemoizedElement` always return the same instance of the Nth element (memoized).
 *
 * @warning nthElementConstructor should never change
 *
 * @param nthElementConstructor a callback that returns what we want the Nth element to be.
 * @returns a callback to get the Nth memoized element.
 */
const useCachedValues = nthElementConstructor => {
  const memoizedElements = (0, react_1.useRef)({});
  return (0, react_1.useCallback)(n => {
    if (memoizedElements.current[n]) return memoizedElements.current[n];
    const newElement = nthElementConstructor(n);
    memoizedElements.current[n] = newElement;
    return newElement;
    /** We purposefully dont put `nthElementConstructor` as a dependency because, if it changed,
     *  we would have to re-construct the whole cache. This use-case is not supported yet. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
exports.useCachedValues = useCachedValues;

/***/ }),

/***/ 9079:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useWebVirtualizedListAnimation = exports.useVirtualizedListAnimation = void 0;
const react_1 = __webpack_require__(8156);
const react_native_1 = __webpack_require__(9925);
const useVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  vertical = false,
  scrollDuration,
  scrollOffsetsArray
}) => {
  const translation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
  const newTranslationValue = scrollOffsetsArray[currentlyFocusedItemIndex];
  (0, react_1.useEffect)(() => {
    react_native_1.Animated.timing(translation, {
      toValue: newTranslationValue,
      duration: scrollDuration,
      useNativeDriver: true,
      easing: react_native_1.Easing.out(react_native_1.Easing.sin)
    }).start();
  }, [translation, newTranslationValue, scrollDuration]);
  return {
    transform: [vertical ? {
      translateY: translation
    } : {
      translateX: translation
    }]
  };
};
exports.useVirtualizedListAnimation = useVirtualizedListAnimation;
const useWebVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  vertical = false,
  scrollDuration,
  scrollOffsetsArray
}) => {
  const animationDuration = `${scrollDuration}ms`;
  const newTranslationValue = scrollOffsetsArray[currentlyFocusedItemIndex];
  return {
    transitionDuration: animationDuration,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
    transform: [vertical ? {
      translateY: newTranslationValue
    } : {
      translateX: newTranslationValue
    }]
  };
};
exports.useWebVirtualizedListAnimation = useWebVirtualizedListAnimation;

/***/ }),

/***/ 7783:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.configureRemoteControl = exports.remoteControlUnsubscriber = exports.remoteControlSubscriber = void 0;
exports.remoteControlSubscriber = undefined;
exports.remoteControlUnsubscriber = undefined;
const configureRemoteControl = options => {
  exports.remoteControlSubscriber = options.remoteControlSubscriber;
  exports.remoteControlUnsubscriber = options.remoteControlUnsubscriber;
};
exports.configureRemoteControl = configureRemoteControl;

/***/ }),

/***/ 8178:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DefaultFocus = exports.useSpatialNavigatorDefaultFocus = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const SpatialNavigatorDefaultFocusContext = (0, react_1.createContext)(false);
const useSpatialNavigatorDefaultFocus = () => {
  const spatialNavigatorDefaultFocus = (0, react_1.useContext)(SpatialNavigatorDefaultFocusContext);
  return spatialNavigatorDefaultFocus;
};
exports.useSpatialNavigatorDefaultFocus = useSpatialNavigatorDefaultFocus;
const DefaultFocus = ({
  children,
  enable = true
}) => {
  return (0, jsx_runtime_1.jsx)(SpatialNavigatorDefaultFocusContext.Provider, {
    value: enable,
    children: children
  });
};
exports.DefaultFocus = DefaultFocus;

/***/ }),

/***/ 5274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSpatialNavigationDeviceType = exports.SpatialNavigationDeviceTypeProvider = exports.DeviceContext = void 0;
const jsx_runtime_1 = __webpack_require__(2322);
const react_1 = __webpack_require__(8156);
const react_native_1 = __webpack_require__(9925);
exports.DeviceContext = (0, react_1.createContext)({
  deviceType: 'remoteKeys',
  deviceTypeRef: {
    current: 'remoteKeys'
  },
  setDeviceType: () => {},
  getScrollingIntervalId: () => null,
  setScrollingIntervalId: () => {}
});
const SpatialNavigationDeviceTypeProvider = ({
  children
}) => {
  const [deviceType, setDeviceTypeWithoutRef] = (0, react_1.useState)('remoteKeys');
  const deviceTypeRef = (0, react_1.useRef)(deviceType);
  const scrollingId = (0, react_1.useRef)(null);
  const setDeviceType = (0, react_1.useCallback)(deviceType => {
    deviceTypeRef.current = deviceType;
    setDeviceTypeWithoutRef(deviceType);
  }, []);
  const setScrollingIntervalId = (0, react_1.useCallback)(id => {
    if (scrollingId.current) {
      clearInterval(scrollingId.current);
    }
    scrollingId.current = id;
  }, []);
  const getScrollingIntervalId = (0, react_1.useCallback)(() => scrollingId.current, []);
  (0, react_1.useEffect)(() => {
    if (deviceType === 'remotePointer' || react_native_1.Platform.OS !== 'web') return;
    const callback = () => {
      setDeviceType('remotePointer');
    };
    window.addEventListener('mousemove', callback);
    return () => window.removeEventListener('mousemove', callback);
  }, [deviceType, setDeviceType]);
  const value = (0, react_1.useMemo)(() => ({
    deviceType,
    deviceTypeRef,
    setDeviceType,
    getScrollingIntervalId,
    setScrollingIntervalId
  }), [deviceType, setDeviceType, getScrollingIntervalId, setScrollingIntervalId]);
  return (0, jsx_runtime_1.jsx)(exports.DeviceContext.Provider, {
    value: value,
    children: children
  });
};
exports.SpatialNavigationDeviceTypeProvider = SpatialNavigationDeviceTypeProvider;
const useSpatialNavigationDeviceType = () => (0, react_1.useContext)(exports.DeviceContext);
exports.useSpatialNavigationDeviceType = useSpatialNavigationDeviceType;

/***/ }),

/***/ 5748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useLockSpatialNavigation = exports.LockSpatialNavigationContext = exports.useIsLocked = void 0;
const react_1 = __webpack_require__(8156);
/**
 * We store the number of times that we have been asked to lock the navigator
 * to avoid any race conditions
 *
 * It's more reliable than a simple boolean
 */
const lockReducer = (state, action) => {
  switch (action) {
    case 'lock':
      return state + 1;
    case 'unlock':
      return state - 1;
    default:
      return state;
  }
};
const useIsLocked = () => {
  const [lockAmount, dispatch] = (0, react_1.useReducer)(lockReducer, 0);
  const lockActions = (0, react_1.useMemo)(() => ({
    lock: () => dispatch('lock'),
    unlock: () => dispatch('unlock')
  }), [dispatch]);
  return {
    isLocked: lockAmount !== 0,
    lockActions
  };
};
exports.useIsLocked = useIsLocked;
exports.LockSpatialNavigationContext = (0, react_1.createContext)({
  lock: () => undefined,
  unlock: () => undefined
});
const useLockSpatialNavigation = () => {
  const {
    lock,
    unlock
  } = (0, react_1.useContext)(exports.LockSpatialNavigationContext);
  return {
    lock,
    unlock
  };
};
exports.useLockSpatialNavigation = useLockSpatialNavigation;

/***/ }),

/***/ 5814:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useParentId = exports.ParentIdContext = void 0;
const react_1 = __webpack_require__(8156);
exports.ParentIdContext = (0, react_1.createContext)(null);
const useParentId = () => {
  const parentId = (0, react_1.useContext)(exports.ParentIdContext);
  if (!parentId) throw new Error('Node used without any Parent!');
  return parentId;
};
exports.useParentId = useParentId;

/***/ }),

/***/ 1262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSpatialNavigatorParentScroll = exports.SpatialNavigatorParentScrollContext = void 0;
const react_1 = __webpack_require__(8156);
exports.SpatialNavigatorParentScrollContext = (0, react_1.createContext)(() => {});
const useSpatialNavigatorParentScroll = () => {
  const scrollToNodeIfNeeded = (0, react_1.useContext)(exports.SpatialNavigatorParentScrollContext);
  return {
    scrollToNodeIfNeeded
  };
};
exports.useSpatialNavigatorParentScroll = useSpatialNavigatorParentScroll;

/***/ }),

/***/ 4428:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSpatialNavigator = exports.SpatialNavigatorContext = void 0;
const react_1 = __webpack_require__(8156);
exports.SpatialNavigatorContext = (0, react_1.createContext)(null);
const useSpatialNavigator = () => {
  const spatialNavigator = (0, react_1.useContext)(exports.SpatialNavigatorContext);
  if (!spatialNavigator) throw new Error('No registered spatial navigator on this page. Use the <SpatialNavigationRoot /> component.');
  return spatialNavigator;
};
exports.useSpatialNavigator = useSpatialNavigator;

/***/ }),

/***/ 9839:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.typedForwardRef = void 0;
const react_1 = __webpack_require__(8156);
/**
 * This works like React.forwardRef but for components with generics props.
 * @warning Don't use this if your component type isn't generic => `const Component = <T>() => {...}` and displayName is not supported yet
 */
function typedForwardRef(render) {
  return (0, react_1.forwardRef)(render);
}
exports.typedForwardRef = typedForwardRef;

/***/ }),

/***/ 9643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.typedMemo = void 0;
const react_1 = __webpack_require__(8156);
/**
 * This works like React.memo but for components with generics props.
 * See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
 * @warning Don't use this if your component type isn't generic => `const Component = <T>() => {...}`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function typedMemo(Component, propsAreEqual) {
  return (0, react_1.memo)(Component, propsAreEqual);
}
exports.typedMemo = typedMemo;

/***/ }),

/***/ 6909:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scrollToNewlyFocusedElement = void 0;
const scrollToNewlyFocusedElement = ({
  newlyFocusedElementDistanceToLeftRelativeToLayout,
  newlyFocusedElementDistanceToTopRelativeToLayout,
  horizontal,
  offsetFromStart,
  scrollViewRef
}) => {
  var _a, _b;
  if (horizontal) {
    (_a = scrollViewRef === null || scrollViewRef === void 0 ? void 0 : scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
      x: newlyFocusedElementDistanceToLeftRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true
    });
  } else {
    (_b = scrollViewRef === null || scrollViewRef === void 0 ? void 0 : scrollViewRef.current) === null || _b === void 0 ? void 0 : _b.scrollTo({
      y: newlyFocusedElementDistanceToTopRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true
    });
  }
};
exports.scrollToNewlyFocusedElement = scrollToNewlyFocusedElement;

/***/ }),

/***/ 3267:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useCreateSpatialNavigator = void 0;
const SpatialNavigator_1 = __importDefault(__webpack_require__(6135));
const react_1 = __webpack_require__(8156);
const useCreateSpatialNavigator = ({
  onDirectionHandledWithoutMovementRef
}) => {
  const spatialNavigator = (0, react_1.useMemo)(() => new SpatialNavigator_1.default({
    onDirectionHandledWithoutMovementRef
  }),
  // This dependency should be safe and won't recreate a navigator every time since it's a ref
  [onDirectionHandledWithoutMovementRef]);
  return spatialNavigator;
};
exports.useCreateSpatialNavigator = useCreateSpatialNavigator;

/***/ }),

/***/ 7111:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useRemoteControl = void 0;
const react_1 = __webpack_require__(8156);
const configureRemoteControl_1 = __webpack_require__(7783);
const DeviceContext_1 = __webpack_require__(5274);
const useRemoteControl = ({
  spatialNavigator,
  isActive
}) => {
  const {
    setDeviceType,
    setScrollingIntervalId: setScrollingId
  } = (0, DeviceContext_1.useSpatialNavigationDeviceType)();
  (0, react_1.useEffect)(() => {
    if (!configureRemoteControl_1.remoteControlSubscriber) {
      console.warn('[React Spatial Navigation] You probably forgot to configure the remote control. Please call the configuration function.');
      return;
    }
    if (!isActive) {
      return () => undefined;
    }
    const listener = (0, configureRemoteControl_1.remoteControlSubscriber)(direction => {
      setDeviceType('remoteKeys');
      spatialNavigator.handleKeyDown(direction);
      setScrollingId(null);
    });
    return () => {
      if (!configureRemoteControl_1.remoteControlUnsubscriber) {
        console.warn('[React Spatial Navigation] You did not provide a remote control unsubscriber. Are you sure you called configuration correctly?');
        return;
      }
      (0, configureRemoteControl_1.remoteControlUnsubscriber)(listener);
    };
  }, [spatialNavigator, isActive, setDeviceType, setScrollingId]);
};
exports.useRemoteControl = useRemoteControl;

/***/ }),

/***/ 7256:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSpatialNavigatorFocusableAccessibilityProps = void 0;
const react_1 = __webpack_require__(8156);
const ParentIdContext_1 = __webpack_require__(5814);
const SpatialNavigatorContext_1 = __webpack_require__(4428);
const useSpatialNavigatorFocusableAccessibilityProps = () => {
  const spatialNavigator = (0, SpatialNavigatorContext_1.useSpatialNavigator)();
  const id = (0, ParentIdContext_1.useParentId)();
  const accessibilityProps = (0, react_1.useMemo)(() => ({
    accessible: true,
    accessibilityRole: 'button',
    accessibilityActions: [{
      name: 'activate'
    }],
    onAccessibilityAction: () => {
      var _a, _b;
      const currentNode = spatialNavigator.getCurrentFocusNode();
      if ((currentNode === null || currentNode === void 0 ? void 0 : currentNode.id) === id) {
        (_b = (_a = spatialNavigator.getCurrentFocusNode()) === null || _a === void 0 ? void 0 : _a.onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, currentNode);
      } else {
        spatialNavigator.grabFocus(id);
      }
    }
  }), [id, spatialNavigator]);
  return accessibilityProps;
};
exports.useSpatialNavigatorFocusableAccessibilityProps = useSpatialNavigatorFocusableAccessibilityProps;

/***/ }),

/***/ 2551:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useUniqueId = void 0;
const lodash_uniqueid_1 = __importDefault(__webpack_require__(2120));
const react_1 = __webpack_require__(8156);
const useUniqueId = ({
  prefix
} = {}) => (0, react_1.useMemo)(() => (0, lodash_uniqueid_1.default)(prefix), [prefix]);
exports.useUniqueId = useUniqueId;

/***/ }),

/***/ 2120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;


/***/ }),

/***/ 857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(7772);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 3366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(857),
    getRawTag = __webpack_require__(2107),
    objectToString = __webpack_require__(7157);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 3228:
/***/ ((module) => {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

module.exports = baseRange;


/***/ }),

/***/ 9872:
/***/ ((module) => {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ 1704:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(2153);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 2941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRange = __webpack_require__(3228),
    isIterateeCall = __webpack_require__(2406),
    toFinite = __webpack_require__(5707);

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

module.exports = createRange;


/***/ }),

/***/ 1242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 2107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(857);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 9045:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 2406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(1225),
    isArrayLike = __webpack_require__(7878),
    isIndex = __webpack_require__(9045),
    isObject = __webpack_require__(9259);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ 7157:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 7772:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(1242);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 2153:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 3586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSlice = __webpack_require__(9872),
    isIterateeCall = __webpack_require__(2406),
    toInteger = __webpack_require__(8101);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}

module.exports = chunk;


/***/ }),

/***/ 1225:
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 7878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(1049),
    isLength = __webpack_require__(1158);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 1049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(3366),
    isObject = __webpack_require__(9259);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 1158:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 9259:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 5125:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 4795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(3366),
    isObjectLike = __webpack_require__(5125);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 2689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createRange = __webpack_require__(2941);

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

module.exports = range;


/***/ }),

/***/ 5707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toNumber = __webpack_require__(7642);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ 8101:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__(5707);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ 7642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(1704),
    isObject = __webpack_require__(9259),
    isSymbol = __webpack_require__(4795);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 1837:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(8156),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 2322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(1837);
} else {}


/***/ }),

/***/ 8156:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__8156__;

/***/ }),

/***/ 9925:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__9925__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpatialNavigation = exports.SpatialNavigationDeviceTypeProvider = exports.SpatialNavigationFocusableView = exports.useLockSpatialNavigation = exports.useSpatialNavigatorFocusableAccessibilityProps = exports.SpatialNavigationVirtualizedGrid = exports.SpatialNavigationVirtualizedList = exports.DefaultFocus = exports.SpatialNavigationView = exports.SpatialNavigationScrollView = exports.SpatialNavigationRoot = exports.SpatialNavigationNode = exports.Directions = void 0;
const configureRemoteControl_1 = __webpack_require__(7783);
var lrud_1 = __webpack_require__(7295);
Object.defineProperty(exports, "Directions", ({
  enumerable: true,
  get: function () {
    return lrud_1.Directions;
  }
}));
var Node_1 = __webpack_require__(6016);
Object.defineProperty(exports, "SpatialNavigationNode", ({
  enumerable: true,
  get: function () {
    return Node_1.SpatialNavigationNode;
  }
}));
var Root_1 = __webpack_require__(1635);
Object.defineProperty(exports, "SpatialNavigationRoot", ({
  enumerable: true,
  get: function () {
    return Root_1.SpatialNavigationRoot;
  }
}));
var ScrollView_1 = __webpack_require__(1334);
Object.defineProperty(exports, "SpatialNavigationScrollView", ({
  enumerable: true,
  get: function () {
    return ScrollView_1.SpatialNavigationScrollView;
  }
}));
var View_1 = __webpack_require__(755);
Object.defineProperty(exports, "SpatialNavigationView", ({
  enumerable: true,
  get: function () {
    return View_1.SpatialNavigationView;
  }
}));
var DefaultFocusContext_1 = __webpack_require__(8178);
Object.defineProperty(exports, "DefaultFocus", ({
  enumerable: true,
  get: function () {
    return DefaultFocusContext_1.DefaultFocus;
  }
}));
var SpatialNavigationVirtualizedList_1 = __webpack_require__(4040);
Object.defineProperty(exports, "SpatialNavigationVirtualizedList", ({
  enumerable: true,
  get: function () {
    return SpatialNavigationVirtualizedList_1.SpatialNavigationVirtualizedList;
  }
}));
var SpatialNavigationVirtualizedGrid_1 = __webpack_require__(6975);
Object.defineProperty(exports, "SpatialNavigationVirtualizedGrid", ({
  enumerable: true,
  get: function () {
    return SpatialNavigationVirtualizedGrid_1.SpatialNavigationVirtualizedGrid;
  }
}));
var useSpatialNavigatorFocusableAccessibilityProps_1 = __webpack_require__(7256);
Object.defineProperty(exports, "useSpatialNavigatorFocusableAccessibilityProps", ({
  enumerable: true,
  get: function () {
    return useSpatialNavigatorFocusableAccessibilityProps_1.useSpatialNavigatorFocusableAccessibilityProps;
  }
}));
var LockSpatialNavigationContext_1 = __webpack_require__(5748);
Object.defineProperty(exports, "useLockSpatialNavigation", ({
  enumerable: true,
  get: function () {
    return LockSpatialNavigationContext_1.useLockSpatialNavigation;
  }
}));
var FocusableView_1 = __webpack_require__(3253);
Object.defineProperty(exports, "SpatialNavigationFocusableView", ({
  enumerable: true,
  get: function () {
    return FocusableView_1.SpatialNavigationFocusableView;
  }
}));
var DeviceContext_1 = __webpack_require__(5274);
Object.defineProperty(exports, "SpatialNavigationDeviceTypeProvider", ({
  enumerable: true,
  get: function () {
    return DeviceContext_1.SpatialNavigationDeviceTypeProvider;
  }
}));
exports.SpatialNavigation = {
  configureRemoteControl: configureRemoteControl_1.configureRemoteControl
};
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map