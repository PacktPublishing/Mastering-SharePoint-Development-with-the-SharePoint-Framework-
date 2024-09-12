import * as React from 'react';
import type { IPacktProductSearchBoxProps } from './IPacktProductSearchBoxProps';
import { SearchBox } from '@fluentui/react';
import * as strings from 'PacktProductSearchBoxWebPartStrings';

export default class PacktProductSearchBox extends React.Component<IPacktProductSearchBoxProps, {}> {
  public render(): React.ReactElement<IPacktProductSearchBoxProps> {

    return (
      <SearchBox placeholder={strings.SearchBoxPlaceholder} onSearch={this.props.onSearch} />
    );
  }
}
