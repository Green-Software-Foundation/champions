const ProfileCardSkeleton = () => (
  <div
    className="relative isolate space-y-5 overflow-hidden rounded-lg bg-white p-4 shadow before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-primary-default/10 before:bg-gradient-to-r before:from-transparent before:via-primary-default/10 before:to-transparent h-full"
  >
    <div className="grid grid-rows-[1fr_auto_1fr] items-center h-full gap-4">
        <div className="h-2 w-1/4 mx-auto rounded-md bg-primary-default/10 "></div>
      <div className="flex flex-row md:flex-col items-center justify-center gap-4">
        <div className="w-24 h-24 mb-3 rounded-full bg-primary-default/10 flex-shrink-0"></div>
        <div className="flex flex-col md:items-center w-full gap-3">
          <div className="h-4 w-4/5 rounded-lg bg-primary-default/10"></div>

          <div className="h-3 w-3/5 rounded-md bg-primary-default/10"></div>

          <div className="h-2 w-1/5 rounded-md bg-primary-default/10"><div></div></div>
        </div>
      </div>
    </div>
  </div>
)

export default ProfileCardSkeleton;