"use client";

import { accountDisplayName, accountHandle, useAuth } from "@/components/auth/AuthProvider";

// A small, hand-tokenized syntax highlighter for this one snippet — no
// dependency needed for a single static code block.
function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-[#c586c0]">{children}</span>;
}
function Type({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-[#ce9178]">{children}</span>;
}
function Fn({ children }: { children: React.ReactNode }) {
  return <span className="text-[#dcdcaa]">{children}</span>;
}
function Prop({ children }: { children: React.ReactNode }) {
  return <span className="text-[#9cdcfe]">{children}</span>;
}
function Cm({ children }: { children: React.ReactNode }) {
  return <span className="text-[#6a9955]">{children}</span>;
}
function Pn({ children }: { children: React.ReactNode }) {
  return <span className="text-[#d4d4d4]">{children}</span>;
}

export function ProfileCodeCard() {
  const { account, status } = useAuth();
  const name = status === "account" ? accountDisplayName(account) : "Guest Developer";
  const handle = status === "account" ? accountHandle(account) : "guest";
  const memberSince = account?.createdAt ? new Date(account.createdAt).getFullYear().toString() : "—";
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ") || "—";

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1e1e1e] shadow-lg">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#252526] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f44336]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e7a917]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="ml-2 text-xs font-medium text-white/50">developer.ts</span>
      </div>

      <pre className="scrollbar-thin overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          <Cm>// Every learner on RivoCode is, first and foremost, a developer.</Cm>
          {"\n"}
          <Kw>interface</Kw> <Type>Developer</Type> <Pn>{"{"}</Pn>
          {"\n  "}
          <Prop>firstName</Prop>
          <Pn>: </Pn>
          <Type>string</Type>
          <Pn>;</Pn>
          {"\n  "}
          <Prop>lastName</Prop>
          <Pn>: </Pn>
          <Type>string</Type>
          <Pn>;</Pn>
          {"\n  "}
          <Prop>handle</Prop>
          <Pn>: </Pn>
          <Type>string</Type>
          <Pn>;</Pn>
          {"\n  "}
          <Prop>memberSince</Prop>
          <Pn>: </Pn>
          <Type>string</Type>
          <Pn>;</Pn>
          {"\n"}
          <Pn>{"}"}</Pn>
          {"\n\n"}
          <Kw>const</Kw> <Prop>currentUser</Prop><Pn>: </Pn><Type>Developer</Type> <Pn>= {"{"}</Pn>
          {"\n  "}
          <Prop>firstName</Prop>
          <Pn>: </Pn>
          <Str>&quot;{first}&quot;</Str>
          <Pn>,</Pn>
          {"\n  "}
          <Prop>lastName</Prop>
          <Pn>: </Pn>
          <Str>&quot;{last}&quot;</Str>
          <Pn>,</Pn>
          {"\n  "}
          <Prop>handle</Prop>
          <Pn>: </Pn>
          <Str>&quot;@{handle}&quot;</Str>
          <Pn>,</Pn>
          {"\n  "}
          <Prop>memberSince</Prop>
          <Pn>: </Pn>
          <Str>&quot;{memberSince}&quot;</Str>
          <Pn>,</Pn>
          {"\n"}
          <Pn>{"};"}</Pn>
          {"\n\n"}
          <Kw>function</Kw> <Fn>introduce</Fn>
          <Pn>(</Pn>
          <Prop>dev</Prop>
          <Pn>: </Pn>
          <Type>Developer</Type>
          <Pn>)</Pn>
          <Pn>: </Pn>
          <Type>string</Type> <Pn>{"{"}</Pn>
          {"\n  "}
          <Kw>return</Kw>{" "}
          <Str>{"`Hi, I'm ${dev.firstName} ${dev.lastName}, learning since ${dev.memberSince}.`"}</Str>
          <Pn>;</Pn>
          {"\n"}
          <Pn>{"}"}</Pn>
          {"\n\n"}
          <Prop>console</Prop>
          <Pn>.</Pn>
          <Fn>log</Fn>
          <Pn>(</Pn>
          <Fn>introduce</Fn>
          <Pn>(</Pn>
          <Prop>currentUser</Prop>
          <Pn>)</Pn>
          <Pn>);</Pn>
        </code>
      </pre>

      <div className="border-t border-white/10 bg-black/40 px-5 py-3 font-mono text-[13px]">
        <span className="text-white/40">$ </span>
        <span className="text-white/70">node developer.ts</span>
        <div className="mt-1.5 text-accent">
          → &quot;Hi, I&apos;m {name}, learning since {memberSince}.&quot;
        </div>
      </div>
    </div>
  );
}
