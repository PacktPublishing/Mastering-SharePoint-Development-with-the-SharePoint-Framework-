import * as React from 'react';
import { ILowStockInformerProps } from './ILowStockInformerProps';
import { ILowStockInformerState } from './ILowStockInformerState';
import styles from './LowStockInformer.module.scss';

export default class LowStockInfomer extends React.Component<ILowStockInformerProps, ILowStockInformerState> {
    constructor(props: ILowStockInformerProps) {
        super(props);

        this.state = {
            show: false,
            lowStockProductNames: ""
        };
    }

    public componentDidMount(): void {
        this.props.productCatalogService.getLowStockProducts(this.props.siteId, this.props.listName)
            .then((products) => {
                if (products.length > 0) {
                    // Get the names of the low stock products
                    let lowStockProductNames = products.map(product => product.modelName).join(", ");
                    this.setState({
                        show: true,
                        lowStockProductNames: lowStockProductNames
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    public render(): React.ReactElement<ILowStockInformerProps> {
        if (!this.state.show) {
            return <></>;
        }

        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <span>{this.state.lowStockProductNames} low in stock. <a href={this.props.listUrl} data-interception="off">Click here</a> to view the list.</span>
                </div>
            </div>
        );
    }
}