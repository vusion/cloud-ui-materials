import { sync } from '@lcap/vue2-utils';
import { createNamespace } from '@lcap-ui/src/utils';
import { BORDER } from '@lcap-ui/src/utils/constant';
import { ChildrenMixin } from '@lcap-ui/src/mixins/relation';
import Iconv from '@lcap-ui/src/iconv';
import VanEmptyCol from '@lcap-ui/src/emptycol';

const [createComponent, bem] = createNamespace('step');

const statusList = ['wait', 'process', 'finish', 'error']

export default createComponent({
  mixins: [
    ChildrenMixin('exVanSteps'),
    sync({
      disabled: 'isDisabled',
      status: 'currentStatus',
      readonly: 'isReadonly',
      lastFinish: 'lastFinish',
    }),
  ],
  components: {
    VanEmptyCol,
  },
  props: {
    value: [Number, String],
    icon: String,
    status: String,
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    lastFinish: { type: Boolean, default: true },
  },
  computed: {
    isDisabled() {
      return (this.parent && this.parent.disabled) || this.disabled;
    },
    isReadonly() {
      return (this.parent && this.parent.readonly) || this.readonly;
    },
    currentStatus() {
      // 指定状态优先
      if (statusList.indexOf(this.status) !== -1) {
        return this.status;
      }

      if ((this.value ?? this.index) < this.parent.currentValue) {
        return 'finish';
      }
      if ((this.value ?? this.index) === +this.parent.currentValue) {
        return 'process';
      }

      return 'wait';
    },

    active() {
      return this.currentStatus === 'process';
    },

    lineStyle() {
      if (this.currentStatus === 'finish') {
        return { background: this.parent.activeColor };
      }

      return { background: this.parent.inactiveColor };
    },

    titleStyle() {
      if (this.active) {
        return { color: this.parent.activeColor };
      }

      if (this.currentStatus === 'wait') {
        return { color: this.parent.inactiveColor };
      }
    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    genCircle() {
      // 指定图标优先
      if (this.icon) {
        return (
          <Iconv
            icotype="only"
            class={bem('icon', this.currentStatus)}
            name={this.icon}
          ></Iconv>
        );
      }

      // 进行中（当前步骤）
      if (this.currentStatus === 'process') {
        // 最后一个展示完成状态
        if (this.index === this.parent.children.length - 1 && this.parent.lastFinish) {
          return (
            this.slots('finish-icon') || (
              <Iconv
                icotype="only"
                class={bem('icon', 'finish')}
                name="steps-finish"
              />
            )
          );
        }

        return (
          this.slots('active-icon') || (
            <Iconv
              icotype="only"
              class={bem('icon', 'active')}
              name="steps-process"
            />
          )
        );
      }

      // 完成
      if (this.currentStatus === 'finish') {
        return (
          this.slots('finish-icon') || (
            <Iconv
              icotype="only"
              class={bem('icon', 'finish')}
              name="steps-finish"
            />
          )
        );
      }

      if (this.currentStatus === 'error') {
        return (
          <Iconv
            icotype="only"
            class={bem('icon', 'error')}
            name="steps-error"
          />
        );
      }

      // 等待
      const inactiveIconSlot = this.slots('inactive-icon');
      return (
        inactiveIconSlot || (
          <Iconv icotype="only" class={bem('icon')} name="steps-wait" />
        )
      );
    },

    onClickStep() {
      if (this.isReadonly || this.isDisabled) return;

      this.parent.$emit('click-step', this.index);
      this.$emit('clicktitle', this.index);
      this.parent.currentValue = this.value ?? this.index;
    },
    onClickStepIcon() {
      if (this.isReadonly || this.isDisabled) return;

      this.$emit('clickicon', this.index);
      this.parent.currentValue = this.value ?? this.index;
    },
    designerControl() {
      if (this.isReadonly || this.isDisabled) return;

      this.parent.currentValue = this.value ?? this.index;
    },
  },

  render() {
    const { currentStatus, active, border } = this;
    const { direction } = this.parent;

    return (
      <div
        key={this.index}
        class={[
          BORDER,
          bem([
            direction,
            {
              disabled: this.isDisabled,
              [currentStatus]: currentStatus,
              border,
            },
          ]),
        ]}
      >
        <div
          class={bem('title', { active })}
          style={this.titleStyle}
          onClick={this.onClickStep}
          vusion-slot-name="default"
        >
          {this.slots()}
          {!this.slots() && this.ifDesigner() ? (
            <van-empty-col></van-empty-col>
          ) : null}
        </div>
        <div class={bem('circle-container')} onClick={this.onClickStepIcon}>
          {this.genCircle()}
        </div>
        <div class={bem('line')} style={this.lineStyle} />
      </div>
    );
  },
});
