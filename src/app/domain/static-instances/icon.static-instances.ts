export class Icon {
    private static readonly OBSERVACAO: Icon = new Icon("las la-comment-alt");
    private static readonly REJEICAO: Icon = new Icon("las la-times-circle");
    
    private static readonly iconsMap: Map<String, Icon> = new Map([
        ['Observação', Icon.OBSERVACAO],
        ['Rejeição', Icon.REJEICAO]
    ]);

    iconValue: string;

    private constructor(iconValue: string) {
        this.iconValue = iconValue;
    }

    public static findByKey(iconKey: string): Icon {
        return this.iconsMap.get(iconKey);
    }
}