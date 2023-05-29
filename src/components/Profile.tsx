import Image from 'next/image';

interface Props {
  avartar: string;
  name: string;
  bio?: string;
}

export function Profile({ avartar, name, bio }: Props) {
  return (
    <div className="flex flex-row gap-3">
      <Image className="rounded-full w-8 h-8 md:w-10 md:h-10" width={40} height={40} src={avartar} alt="avatar" />
      <div className="flex flex-col justify-center">
        <span className="text-xs md:text-sm font-bold">{name}</span>
        {bio ? <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-600">{bio}</span> : null}
      </div>
    </div>
  );
}
