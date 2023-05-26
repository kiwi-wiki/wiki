import { makeTitle } from '@/utils/metadata';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: {
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: makeTitle({ title: params.categorySlug }),
  };
}

export default function layout({ children, params }: Props) {
  return (
    <div className="flex">
      <div className="w-full h-full p-5 pt-10 overflow-scroll">
        <h1 className="font-bold text-3xl">{decodeURI(params.categorySlug)}</h1>
        {children}
      </div>
      <div className="w-60" />
    </div>
  );
}
