import { observable, action } from 'mobx';

export default class ObservableStore implements ISlotsStore {
    constructor(public root: RootStore) { }

    @observable slotNumber: number | null | string = null;
    @observable secondSlotNumber: number  | null | string =  null;
    @observable newImgUrl: HashMap<string> | null = null;
    @observable isMoveProduct: boolean = false;
    @observable isSlotMachine: boolean = false;


    @action
    public setSlotNumber = (slotNumber: number) => {
        this.slotNumber = slotNumber;
    }

    @action
    public setSecondSlotNumber = (slotNumber: number | string) => {
        this.secondSlotNumber = slotNumber;
    }


    @action
    public setNewImgUrl = (newImgUrl: HashMap<string>) => {
        this.newImgUrl = newImgUrl;
        this.setSlotMachineEffect(true);
    }

    @action
    public setSlotMachineEffect = (flag: boolean) => {
        this.isSlotMachine = flag;
    }

    @action
    public setMoveProduct = (flag: boolean) => {
        this.isMoveProduct = flag;
    }
}