import { StyleSheet, View, ViewStyle } from 'react-native';
import { SpatialNavigationNode } from './Node';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  direction: 'horizontal' | 'vertical';
  alignInGrid?: boolean;
  index?: number;
};

export const SpatialNavigationView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ direction = 'horizontal', alignInGrid = false, children, style, index }: Props, ref) => {
    return (
      <SpatialNavigationNode index={index} orientation={direction} alignInGrid={alignInGrid} ref={ref}>
        <View
          style={[style, direction === 'horizontal' ? styles.viewHorizontal : styles.viewVertical]}
        >
          {children}
        </View>
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationView.displayName = 'SpatialNavigationView';

const styles = StyleSheet.create({
  viewVertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
});
