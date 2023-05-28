import { CopyButton } from '@/components/mdx/Pre/CopyButton';
import classNames from 'classnames';
import preStyles from './pre.module.css';

interface Props extends React.HTMLProps<HTMLPreElement> {
  children: React.ReactNode;
  raw?: string;
  'data-language'?: string;
}

export const Pre = ({ children, raw, ...props }: Props) => {
  const lang = props['data-language'];

  const hnadleCopy = () => {
    if (raw) {
      navigator.clipboard.writeText(raw);
    }
  };

  return (
    <pre {...props} className={classNames(preStyles.pre, 'group')}>
      <div data-language={props['data-language']} className={preStyles.label}>
        {lang ? lang : 'text'}
      </div>

      {!!lang ? (
        <div className={classNames(preStyles['button-wrapper'], 'group-hover:opacity-100')}>
          <CopyButton onClick={hnadleCopy} />
        </div>
      ) : null}

      <div className={preStyles.code}>{children}</div>
    </pre>
  );
};
