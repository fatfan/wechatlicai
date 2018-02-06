export interface FlexProps {
    className?: string;
    inline?: boolean;
    column?: boolean;
    reverse?: boolean;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    alignItems?: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'left' | 'right' | 'baseline' | 'first baseline' | 'last baseline' | 'safe center' | 'unsafe center';
    justifyContent?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'baseline' | 'space-between' | 'space-around'
    grow?: boolean | number;
    shrink?: boolean | number;
    basis?: number;
    style?: React.CSSProperties;
}

const Flex: React.SFC<FlexProps>;
export default Flex;
