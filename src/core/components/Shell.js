import React, { Component } from 'react';
import classnames from 'classnames';
import './styles/Shell.css';
import './styles/DarkTheme.css';
import Output from './Output';
import Input from '../containers/Input';
import StoreContext from '../stores/StoreContext';
import run, { bindConsole, createContainer } from '../lib/run';
import internalCommands from '../lib/internal-commands';

// this is lame, but it's a list of key.code that do stuff in the input that we _want_.
const doStuffKeys = /^(Digit|Key|Num|Period|Semi|Comma|Slash|IntlBackslash|Backspace|Delete|Enter)/;

class Shell extends Component {

  static defaultProps = {
    defaultTheme: 'dark',
  }

  constructor(props) {
    super(props);
    this.onRun = this.onRun.bind(this);
    this.triggerFocus = this.triggerFocus.bind(this);
  }

  async onRun(command) {
    await this.process(command);
    this.input.focus();
    this.input.scrollIntoView();
  }

  async process(command) {
    const console = this.console;

    if (command[0] !== ':') {
      console.push({
        type: 'command',
        command,
        value: command,
      });
      const res = await run(command);
      console.push({
        command,
        type: 'response',
        ...res,
      });
      return;
    }

    let [cmd, ...args] = command.slice(1).split(' ');

    if (/^\d+$/.test(cmd)) {
      args = [parseInt(cmd, 10)];
      cmd = 'history';
    }

    if (!internalCommands[cmd]) {
      console.push({
        command,
        error: true,
        value: new Error(`No such jsconsole command "${command}"`),
        type: 'response',
      });
      return;
    }

    let res = await internalCommands[cmd]({ args, console, app: this });

    if (typeof res === 'string') {
      res = { value: res };
    }

    if (res !== undefined) {
      console.push({
        command,
        type: 'log',
        ...res,
      });
    }

    return;
  }

  componentDidMount() {
    createContainer(this.props.payload);
    bindConsole(this.console);
    const query = decodeURIComponent(window.location.search.substr(1));
    if (query) {
      this.onRun(query);
    } else {
      // this.onRun(':welcome');
    }
  }

  triggerFocus(e) {
    if (e.target.nodeName === 'INPUT') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code && !doStuffKeys.test(e.code)) return;

    this.input.focus();
  }

  render() {
    let {
      commands = [],
      theme,
      layout
    } = this.props;
    theme = theme ? theme : this.props.defaultTheme;
    const className = classnames(['Shell', `theme-${theme}`, layout]);

    return (
      <div
        tabIndex="-1"
        onKeyDown={this.triggerFocus}
        ref={e => (this.app = e)}
        className={className}
      >
        <Output
          ref={e => (this.console = e)}
          commands={commands}
          reverse={layout === 'top'}
        />
        <Input
          inputRef={e => (this.input = e)}
          onRun={this.onRun}
          autoFocus={window.top === window}
          onClear={() => {
            this.console.clear();
          }}
        />
      </div>
    );
  }
}

Shell.contextType = StoreContext;

export default Shell;
