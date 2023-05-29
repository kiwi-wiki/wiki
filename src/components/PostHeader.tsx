interface Props {
  title: string;
}

export function PageHeader({ title }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">{title}</h1>
    </div>
  );
}
