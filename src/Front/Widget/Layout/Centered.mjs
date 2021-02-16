const template = `
<div class="layoutCentered">
    <slot></slot>
</div>
`;

/**
 * Simple centered layout.
 */
function TeqFw_Core_App_Front_Widget_Layout_Centered() {
    return {
        name: 'LayoutCentered',
        template,
    };
}

export default TeqFw_Core_App_Front_Widget_Layout_Centered;
