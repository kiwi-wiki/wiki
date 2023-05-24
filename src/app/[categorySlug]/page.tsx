interface Props {
  params: {
    categorySlug: string;
  };
}

export default function CategoryPage({ params }: Props) {
  new Error('test');

  return <div>{params.categorySlug}</div>;
}
