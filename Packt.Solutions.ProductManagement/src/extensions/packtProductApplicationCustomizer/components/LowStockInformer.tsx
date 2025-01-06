import * as React from 'react';
import { ILowStockInformerProps } from './ILowStockInformerProps';
import { ILowStockInformerState } from './ILowStockInformerState';
import styles from './LowStockInformer.module.scss';

export default class LowStockInfomer extends React.Component<ILowStockInformerProps, ILowStockInformerState> {
    constructor(props: ILowStockInformerProps) {
        super(props);

        this.state = {
            show: false
        };
    }

    public componentDidMount(): void {
        this.setState({
            show: true
        });
    }

    public render(): React.ReactElement<ILowStockInformerProps> {
        if(!this.state.show) {
            return <></>;
        }

        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <span>Products A, B, C are low in stock.</span>
                </div>
            </div>
        );
    }
}