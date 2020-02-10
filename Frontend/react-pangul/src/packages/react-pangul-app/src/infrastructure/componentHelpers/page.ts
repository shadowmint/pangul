import { LoggerProvider } from "../../../../react-pangul-core/src/providers/loggerProvider";
import { Model } from "../../../../react-stateful/src/model";

export abstract class Page<TInitialStateProps, TPageState> extends Model<TPageState> {
    protected isLoaded: boolean = false;
    protected unsubscribe: () => void;

    public constructor(forceUpdate: () => void) {
        super();
        this.unsubscribe = this.subscribe(() => {
            forceUpdate();
        });
    }

    public load(props: TInitialStateProps) {
        this.isLoaded = true;
        this.runAsync(async () => await this.loadInitialData(props));
    }

    public unload(): void {
        if (this.isLoaded) {
            this.isLoaded = false;
            this.unsubscribe();
        }
    }

    protected abstract loadInitialData(props: TInitialStateProps): Promise<void>;

    protected runAsync(task: () => Promise<void>) {
        setTimeout(() => {
            task().then(() => {
                // Success, do nothing
            }, (err) => {
                LoggerProvider.get().error(err);
            });
        }, 1);
    }
}
