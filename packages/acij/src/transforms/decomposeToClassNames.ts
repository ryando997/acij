import { hash } from "@ryan/utils";
import { CSSOMInjector } from "../injectors";

import { ScopedCSSRules } from "./../@types";

export const decomposeToClassnames = (() => {
    let cache: { [key: string]: string } = {};
    let insert = (rx: any): void => {};
    const rx = (
        cn: string,
        prop: string,
        val: string | number | undefined | Array<string | number | undefined>
    ): string => `.${cn}{${prop}:${val};}`;

    function toHyphenLower(match: string): string {
        return `-${match.toLowerCase()}`;
    }

    function normalizeProperty(name: string): string {
        return name.replace(/^ms|[A-Z]/g, toHyphenLower);
    }

    const transpile = (rules: ScopedCSSRules) => {
        let className = "";
        const listRules = Object.keys(rules);
        if (!listRules.length) return "";

        for (const key in rules) {
            const value = rules[key as keyof typeof rules];
            if (value !== null) {
                if (typeof value !== "object" || Array.isArray(value)) {
                    const property = normalizeProperty(key);
                    const _key = `_${hash(key + value)}`;
                    if (cache[_key]) continue;
                    className += _key + " ";
                    cache[_key] = _key;
                    insert(rx(_key, property, value));
                }
            }
        }
        return className.trimEnd();
    };

    if (typeof document !== 'undefined') {
        insert = CSSOMInjector({}).insert;
    }

    return transpile;
})();
