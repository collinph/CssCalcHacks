class cssHack
{
    //primary used for dynamic css variables-- pass in 'var(--dynamic-height)'
    static toUnit(val,unit)
    {
        unit='1'+unit;
        return ` calc(${val} * ${unit}) `;
    }

    static round(val)
    {
        // this  causses a "underflow" that happily results in a rounding error we can use for purposeful rounding.
        return ` calc(${val} * ${Number.MIN_VALUE} / ${Number.MIN_VALUE}) `;
    }

    static abs(val)
    {
        return ` max(${val}, calc(${val} * -1)) `;
    }

    static floor(val)
    {
        return cssHack.round(` calc(${val} - .5) `);
    }

    static ceil(val)
    {
        return cssHack.round( `calc(${val} + .5) `);
    }

    static sign(val)
    {   
        let n = ` min(${val},0) `; //if val is positive then n =0. otherwise n=val.
        let isNegative= ` min(${cssHack.ceil(cssHack.abs(n))},1) `;
        let p = ` max(${val},0) `; //if val is negative then n=0, otherwise n = val;
        let isPositive= ` min(${cssHack.ceil(cssHack.abs(p))},1) `;
        return ` calc(${isPositive} + calc(${isNegative} * -1)) `;
    }

    static mod(val, base)
    {
        let abs = cssHack.abs(val);
        let div = ` calc(${abs} / ${base})`;
        let dec = ` calc(${div} - ${cssHack.floor(div)})`;
        return cssHack.round(` calc(${dec} * ${base}) `);
    }
}