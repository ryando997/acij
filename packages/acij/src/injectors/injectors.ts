import { getStyleElement } from "./getStyleElement";

export interface InjectorConfig<T> {
    /** Target to insert rules into. */
    target?: T;
}

export type InjectorInstance = {
    sheet?: CSSStyleSheet;
    insert(rule: string): number;
};
/**
 * Creates an injector which inserts style rules through the CSS Object Model.
 */
export function CSSOMInjector({
    target = getStyleElement().sheet as CSSStyleSheet,
}: InjectorConfig<CSSStyleSheet>): InjectorInstance {
    return {
        sheet: target,

        insert(rule): number {
            // Avoid render failure during production if a rule cannot be parsed
            try {
                return target.insertRule(rule, target.cssRules.length);
            } catch {
                return -1;
            }
        },
    };
}
