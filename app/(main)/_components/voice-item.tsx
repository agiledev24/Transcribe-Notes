export type VoiceItemProps = {
    transcription: string;
};

const VoiceItem = ({ transcription }: VoiceItemProps) => {
    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row items-center gap-[12px] text-sm font-bold">
                <div className="w-[16px] h-[16px] rounded-full bg-[#d0888c]"/>
                Speaker1
                <div className="text-sm font-thin text-gray-400">
                    0:32
                </div>
            </div>
            <div className="pl-[32px] text-gray-500">
                {transcription}
            </div>
        </div>
    )
}

export default VoiceItem;