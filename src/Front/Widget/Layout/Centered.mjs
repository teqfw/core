const template = `
<div class="layoutCentered">
    <div>
        <slot></slot>
    </div>
</div>
`;

/**
 * Simple centered layout.
 *
 * TODO: move into vue-plugin
 */
export default function TeqFw_Core_Front_Widget_Layout_Centered() {
    return {
        name: 'LayoutCentered',
        template,
    };
}
