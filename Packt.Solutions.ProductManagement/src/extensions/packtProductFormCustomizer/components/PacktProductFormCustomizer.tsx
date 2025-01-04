import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './PacktProductFormCustomizer.module.scss';

export interface IPacktProductFormCustomizerProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'PacktProductFormCustomizer';

export default class PacktProductFormCustomizer extends React.Component<IPacktProductFormCustomizerProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: PacktProductFormCustomizer mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PacktProductFormCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {
    return <div className={styles.packtProductFormCustomizer}>This is the custom form for the Packt Product list</div>;
  }
}
