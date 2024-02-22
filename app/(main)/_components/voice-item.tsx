const VoiceItem = () => {
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
                Jeff.  You already forgot. Jeff, I'm not forgetting anything. Look, that's the reason why I created this tool. Right?
                I will never forget anything again. You've been recording? I'm not recording your voices.Don't worry. It's just processing in real time.
                No one gave approval.
            </div>
        </div>
    )
}

export default VoiceItem;