interface Props {
  title: string;
}

export function PostHeader({ title }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-extrabold text-3xl">{title}</h1>
    </div>
  );
}
