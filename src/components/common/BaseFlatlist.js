import React from 'react';
import { FlatList } from 'react-native';

export default BaseFlatlist = (props) => {

  return (
    <FlatList
      //  contentContainerStyle={{ flex: 1 }}
      key={props.key}
      ListEmptyComponent={props.ListEmptyComponent}
      scrollEnabled={props.scrollEnabled}
      horizontal={props.horizontal}
      data={props.data}
      style={props.style}
      extraData={props.extraData}
      keyExtractor={props.keyExtractor}
      showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      ItemSeparatorComponent={props.ItemSeparatorComponent}
      renderItem={props.renderItem}
      removeClippedSubviews={false}
      legacyImplementation={false}
      numColumns={props.numColumns}
      ListFooterComponent={props.ListFooterComponent}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={props.onEndReachedThreshold}
    />
  )


}