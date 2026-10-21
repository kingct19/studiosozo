"use client";

import { useState } from "react";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(25);
  const [monthlyPerUser, setMonthlyPerUser] = useState(145);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState(12);

  const monthlySaasSpend = teamSize * monthlyPerUser;
  const threeYearSaasCost = monthlySaasSpend * 36;

  // Conservative $32/hr admin/operator labor cost for manual double-entry/spreadsheet workarounds
  const annualLaborWaste = hoursWastedPerWeek * 52 * 32;
  const threeYearLaborWaste = annualLaborWaste * 3;
  const threeYearStatusQuoTotal = threeYearSaasCost + threeYearLaborWaste;

  // Estimated custom build + 36 months of direct cloud hosting (~$95/mo)
  const estimatedCustomBuild =
    teamSize <= 12 ? 15000 : teamSize <= 35 ? 24000 : 35000;
  const threeYearCloudHosting = 95 * 36;
  const threeYearOwnedTotal = estimatedCustomBuild + threeYearCloudHosting;

  const estimatedThreeYearSavings = Math.max(
    0,
    threeYearStatusQuoTotal - threeYearOwnedTotal,
  );

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="relative border border-[#e3e8ee] bg-white p-8 shadow-[0_12px_40px_rgba(10,37,64,0.06)] md:p-10">
      <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[#635bff]" />
      <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-[#635bff]" />
      <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[#635bff]" />
      <div className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-[#635bff]" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-7 lg:col-span-7">
          <div>
            <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} INTERACTIVE 3-YEAR ROI CALCULATOR</MeshInk>
            </div>
            <h3 className="font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
              Calculate your SaaS-sprawl &amp; busywork tax
            </h3>
            <p className="mt-1 font-sans text-sm text-[#425466]">
              Adjust the sliders to match your team size and current software subscriptions.
            </p>
          </div>

          {/* Slider 1: Team Size */}
          <div className="border border-[#e3e8ee] bg-[#f6f9fc] p-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="roi-team-size"
                className="text-xs font-bold tracking-widest text-[#0a2540] uppercase"
              >
                01 // Active Team Members (Reps, Techs, Office)
              </label>
              <span className="border border-[#635bff]/30 bg-white px-3 py-1 font-mono text-sm font-bold text-[#635bff]">
                {teamSize} users
              </span>
            </div>
            <input
              id="roi-team-size"
              type="range"
              min={5}
              max={100}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e3e8ee] accent-[#635bff]"
            />
            <div className="mt-1.5 flex justify-between text-[10px] text-[#6b7c93] uppercase">
              <span>5 users</span>
              <span>50 users</span>
              <span>100 users</span>
            </div>
          </div>

          {/* Slider 2: Monthly SaaS Cost Per User */}
          <div className="border border-[#e3e8ee] bg-[#f6f9fc] p-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="roi-saas-seat"
                className="text-xs font-bold tracking-widest text-[#0a2540] uppercase"
              >
                02 // Combined Monthly SaaS Spend per User
              </label>
              <span className="border border-[#635bff]/30 bg-white px-3 py-1 font-mono text-sm font-bold text-[#635bff]">
                {fmt(monthlyPerUser)} / user / mo
              </span>
            </div>
            <input
              id="roi-saas-seat"
              type="range"
              min={40}
              max={300}
              step={5}
              value={monthlyPerUser}
              onChange={(e) => setMonthlyPerUser(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e3e8ee] accent-[#635bff]"
            />
            <div className="mt-1.5 flex justify-between text-[10px] text-[#6b7c93] uppercase">
              <span>$40/mo (Basic)</span>
              <span>$145/mo (CRM + Field + Zapier)</span>
              <span>$300/mo (Enterprise)</span>
            </div>
          </div>

          {/* Slider 3: Weekly Hours Wasted on Manual Re-Entry */}
          <div className="border border-[#e3e8ee] bg-[#f6f9fc] p-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="roi-hours-wasted"
                className="text-xs font-bold tracking-widest text-[#0a2540] uppercase"
              >
                03 // Team Hours Lost Weekly to Manual Data Entry
              </label>
              <span className="border border-[#635bff]/30 bg-white px-3 py-1 font-mono text-sm font-bold text-[#635bff]">
                {hoursWastedPerWeek} hrs / wk
              </span>
            </div>
            <input
              id="roi-hours-wasted"
              type="range"
              min={0}
              max={40}
              step={1}
              value={hoursWastedPerWeek}
              onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e3e8ee] accent-[#635bff]"
            />
            <div className="mt-1.5 flex justify-between text-[10px] text-[#6b7c93] uppercase">
              <span>0 hrs</span>
              <span>15 hrs/wk</span>
              <span>40 hrs/wk</span>
            </div>
          </div>
        </div>

        {/* Output Breakdown */}
        <div className="flex flex-col justify-between border border-[#e3e8ee] bg-[#f6f9fc] p-6 md:p-8 lg:col-span-5">
          <div className="space-y-5">
            <div className="border-b border-[#e3e8ee] pb-4">
              <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                3-YEAR RENTED SAAS LICENSES ({teamSize} USERS)
              </span>
              <div className="mt-1 font-mono text-2xl font-bold text-[#0a2540]">
                {fmt(threeYearSaasCost)}
              </div>
              <span className="text-[11px] text-[#6b7c93]">
                ({fmt(monthlySaasSpend)}/mo recurring subscription tax)
              </span>
            </div>

            <div className="border-b border-[#e3e8ee] pb-4">
              <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                3-YEAR MANUAL ADMIN &amp; RE-ENTRY LABOR COST
              </span>
              <div className="mt-1 font-mono text-2xl font-bold text-[#0a2540]">
                {fmt(threeYearLaborWaste)}
              </div>
              <span className="text-[11px] text-[#6b7c93]">
                ({hoursWastedPerWeek} hrs/wk × 156 weeks @ $32/hr)
              </span>
            </div>

            <div className="border border-[#635bff]/40 bg-white p-5">
              <span className="text-brand block text-[10px] font-bold tracking-widest uppercase">
                <MeshInk>ESTIMATED 3-YEAR OWNERSHIP SAVINGS</MeshInk>
              </span>
              <div className="mt-1 font-mono text-4xl font-bold tracking-tight text-[#0a2540]">
                {fmt(estimatedThreeYearSavings)}
              </div>
              <p className="mt-2 font-sans text-xs leading-relaxed text-[#425466]">
                After a one-time custom platform build (~{fmt(estimatedCustomBuild)}) and ~$95/mo direct cloud hosting—plus you own the asset 100%.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-2">
            <LitUpButton
              href="/contact"
              className="w-full justify-center text-xs font-bold tracking-widest uppercase"
            >
              Lock In Your Custom Scope{" "}
              <ArrowUpRight01Icon className="h-4 w-4" />
            </LitUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}
