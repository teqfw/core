const CSS_ACTIVE = 'active';
const CSS_AUTOFILL = ':-internal-autofill-selected';
const CSS_CONTAINER = 'container';
const EVT_UPDATE = 'update:modelValue';
const TIMEOUT_AUTOFILL = 500;

const template = `
<label class="teqInput" :for="domId">
    <div class="container">
        <div class="label">{{label}}</div>
        <input 
            :autocomplete="autocomplete"
            :id="domId" 
            :type="type" 
            @blur="onBlur"
            @focus="onFocus"
            v-model="value"
        >
    </div>
</label>
`;

/**
 * Field to get text input.
 */
function TeqFw_Core_App_Front_Widget_Form_Button(spec) {
    /** @type {TeqFw_Core_App_Util_Front_Dom} */
    const utilDom = spec['TeqFw_Core_App_Util_Front_Dom$']; // instance singleton

    return {
        name: 'TextInput',
        template,
        data: function () {
            return {
                deferredTimer: null,
                id: null,
            };
        },
        props: {
            autocomplete: {type: String, default: 'on'},
            hideHint: Boolean,
            hint: String,
            label: String,
            modelValue: String,
            stackLabel: Boolean,
            pageTitle: String,
            type: {type: String, default: 'text'}
        },
        computed: {
            domId() {
                if (!this.id) this.id = utilDom.getUniqueId('teq-input');
                return this.id;
            },
            value: {
                get() {
                    return this.modelValue;
                },
                set(value) {
                    this.$emit(EVT_UPDATE, value);
                }
            }
        },
        methods: {
            onBlur() {
                if (!this.value) {
                    const elContainer = this.$el.getElementsByClassName(CSS_CONTAINER);
                    elContainer[0].classList.remove(CSS_ACTIVE);
                }
            },
            onFocus() {
                const elContainer = this.$el.getElementsByClassName(CSS_CONTAINER);
                elContainer[0].classList.add(CSS_ACTIVE);
            },
        },
        watch: {},
        emits: [EVT_UPDATE],
        mounted() {
            // deferred activation for autofill fields
            setTimeout(() => {
                const elInput = this.$el.getElementsByTagName('INPUT');
                if (elInput[0].matches(CSS_AUTOFILL)) {
                    const elContainer = this.$el.getElementsByClassName(CSS_CONTAINER);
                    elContainer[0].classList.add(CSS_ACTIVE);
                }
            }, TIMEOUT_AUTOFILL);
        },
    };
}

export default TeqFw_Core_App_Front_Widget_Form_Button;
