import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';
import { RxCaretRight } from 'react-icons/rx';

interface Props {
  categoryUrl: string;
}

export function CategoryBreadcrumb({ categoryUrl }: Props) {
  return (
    <Breadcrumb seperator={<RxCaretRight size={20} className="text-gray-400" />}>
      <BreadcrumbItem href="/" text="Home" />
      <BreadcrumbItem href={categoryUrl} text={categoryUrl} />
    </Breadcrumb>
  );
}
