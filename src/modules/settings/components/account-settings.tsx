import { Button, Input } from "antd";

const AccountSettings = () => {
  return (
    <div className="p-6 bg-[#2a2a2d] text-white rounded-xl">
      <div className="mb-12 pb-5 flex justify-between items-center border-b border-[#343436]">
        <div>
          <h3 className="mb-1 font-semibold text-3xl">Account</h3>
          <p>Muhammad@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-white border-none hover:!bg-white hover:opacity-90 text-[#344054]">
            Cancel
          </Button>
          <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-[#5b9bec] border-none hover:!bg-[#5b9bec] hover:opacity-90 text-white">
            Save
          </Button>
        </div>
      </div>

      <div className="mb-5 flex gap-8 pb-5 border-b border-[#343436]">
        <p className="w-full max-w-[280px]">Username</p>
        <Input className="max-w-[512px] h-[44px] bg-[#1a1a1d] border-none text-white hover:bg-[#1a1a1d] focus:bg-[#1a1a1d]" />
      </div>

      <div className="mb-5 flex gap-8 pb-5 border-b border-[#343436]">
        <div className="max-w-[280px]">
          <p className="w-full">Email</p>
          <p className="text-[#ADBDB5] text-sm">
            Enter an alternative email if you’d like to be contacted via a
            different email.
          </p>
        </div>
        <Input className="max-w-[512px] h-[44px] bg-[#1a1a1d] border-none text-white hover:bg-[#1a1a1d] focus:bg-[#1a1a1d]" />
      </div>

      <div className="mb-5 flex gap-8 pb-5 border-b border-[#343436]">
        <div className="max-w-[280px]">
          <p className="w-full">Password</p>
          <p className="text-[#ADBDB5] text-sm">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className="w-full max-w-[512px]">
          <p className="mb-[6px]">Current password</p>
          <Input
            className="mb-5 h-[44px] bg-[#1a1a1d] border-none text-white hover:bg-[#1a1a1d] focus:bg-[#1a1a1d]"
            type="password"
          />
          <p className="mb-[6px]">New password</p>
          <Input
            className="mb-5 h-[44px] bg-[#1a1a1d] border-none text-white hover:bg-[#1a1a1d] focus:bg-[#1a1a1d]"
            type="password"
          />
          <p className="mb-[6px]">Confirm new password</p>
          <Input
            className="mb-5 h-[44px] bg-[#1a1a1d] border-none text-white hover:bg-[#1a1a1d] focus:bg-[#1a1a1d]"
            type="password"
          />

          <div className="flex justify-end items-center gap-3">
            <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-white border-none hover:!bg-white hover:opacity-90 text-[#344054]">
              Cancel
            </Button>
            <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-[#5b9bec] border-none hover:!bg-[#5b9bec] hover:opacity-90 text-white">
              Update password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
