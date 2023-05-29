import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';
import { RxCaretRight } from 'react-icons/rx';

interface Props {
  categoryUrl: string;
  postUrl: string;
  postTitle?: string;
}

export function PostBreadcrumb({ categoryUrl, postUrl, postTitle }: Props) {
  return (
    <Breadcrumb seperator={<RxCaretRight size={20} />}>
      <BreadcrumbItem href="/" text="Home" />
      <BreadcrumbItem href={categoryUrl} text={categoryUrl} />
      <BreadcrumbItem href={postUrl} text={postTitle} />
    </Breadcrumb>
  );
}
