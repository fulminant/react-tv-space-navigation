import { useMemo } from 'react';
import { ItemWithIndex } from './VirtualizedList';
import { SpatialNavigationNode } from '../Node';
import {
  SpatialNavigationVirtualizedListWithScroll,
  SpatialNavigationVirtualizedListWithScrollProps,
} from './SpatialNavigationVirtualizedListWithScroll';
import { typedMemo } from '../../helpers/TypedMemo';
import { addIndex } from './helpers/addIndex';

/**
 * Use this component to render spatially navigable virtualized lists.
 * This component wraps the virtualized list inside a parent navigation node.
 * */
export const SpatialNavigationVirtualizedList = typedMemo(
  <T extends ItemWithIndex>(props: SpatialNavigationVirtualizedListWithScrollProps<T>) => {
    const indexedData = useMemo(() => addIndex(props.data), [props.data]);

    return (
      <SpatialNavigationNode orientation={props.orientation ?? 'horizontal'}>
        <SpatialNavigationVirtualizedListWithScroll {...props} data={indexedData} />
      </SpatialNavigationNode>
    );
  },
);
