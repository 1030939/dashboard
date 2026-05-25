// /data/kpiData.ts

// 1. 타입 정의 
export interface KPISummary {
    title: string;
    value: number;
    changeRate: number; // 전일 대비 증감률 (%)
  }
  
  export interface ChartData30Days {
    date: string;
    monthlyPass: number;
    package: number;
    paidCurrency: number;
    newUserRevenue: number;
    existingUserRevenue: number;
  }
  
  export interface CountryRevenue {
    country: string;
    ratio: number; // (%)
  }
  
  export interface RecentPurchase {
    id: string;
    userName: string;
    item: string;
    amount: number;
    date: string;
  }
  
  // 2. Mock 데이터보내기
  export const mockData = {
    // Zone A: 핵심 KPI 카드용 (매출, DAU, MAU)
    summary: [
      { title: "매출", value: 125000000, changeRate: 5.2 },
      { title: "DAU", value: 45000, changeRate: -1.5 },
      { title: "MAU", value: 120000, changeRate: 2.8 },
    ] as KPISummary[],
  
    // Zone B: 차트용 (90일 매출 변화 및 구성, 2024-03-01 ~ 2024-05-30)
    revenueTrend: [
      { date: "2024-03-01", monthlyPass: 3176, package: 4110, paidCurrency: 1648, newUserRevenue: 1140, existingUserRevenue: 7090 },
      { date: "2024-03-02", monthlyPass: 3422, package: 4684, paidCurrency: 1856, newUserRevenue: 1283, existingUserRevenue: 7979 },
      { date: "2024-03-03", monthlyPass: 3474, package: 4753, paidCurrency: 1894, newUserRevenue: 1331, existingUserRevenue: 8076 },
      { date: "2024-03-04", monthlyPass: 2230, package: 4183, paidCurrency: 1759, newUserRevenue: 1203, existingUserRevenue: 7369 },
      { date: "2024-03-05", monthlyPass: 2520, package: 4378, paidCurrency: 1796, newUserRevenue: 1324, existingUserRevenue: 7462 },
      { date: "2024-03-06", monthlyPass: 2566, package: 4445, paidCurrency: 1833, newUserRevenue: 1370, existingUserRevenue: 7555 },
      { date: "2024-03-07", monthlyPass: 2612, package: 4512, paidCurrency: 1870, newUserRevenue: 1416, existingUserRevenue: 7648 },
      { date: "2024-03-08", monthlyPass: 2370, package: 4174, paidCurrency: 1673, newUserRevenue: 1192, existingUserRevenue: 7246 },
      { date: "2024-03-09", monthlyPass: 2567, package: 4766, paidCurrency: 1889, newUserRevenue: 1344, existingUserRevenue: 8164 },
      { date: "2024-03-10", monthlyPass: 2614, package: 4836, paidCurrency: 1927, newUserRevenue: 1392, existingUserRevenue: 8262 },
      { date: "2024-03-11", monthlyPass: 2254, package: 4242, paidCurrency: 1784, newUserRevenue: 1248, existingUserRevenue: 7525 },
      { date: "2024-03-12", monthlyPass: 2554, package: 4442, paidCurrency: 1821, newUserRevenue: 1376, existingUserRevenue: 7618 },
      { date: "2024-03-13", monthlyPass: 2600, package: 4509, paidCurrency: 1858, newUserRevenue: 1422, existingUserRevenue: 7711 },
      { date: "2024-03-14", monthlyPass: 2646, package: 4576, paidCurrency: 1895, newUserRevenue: 1468, existingUserRevenue: 7804 },
      { date: "2024-03-15", monthlyPass: 2692, package: 4643, paidCurrency: 1932, newUserRevenue: 1514, existingUserRevenue: 7897 },
      { date: "2024-03-16", monthlyPass: 2895, package: 5254, paidCurrency: 2156, newUserRevenue: 1675, existingUserRevenue: 8845 },
      { date: "2024-03-17", monthlyPass: 2653, package: 4918, paidCurrency: 1960, newUserRevenue: 1452, existingUserRevenue: 8447 },
      { date: "2024-03-18", monthlyPass: 2278, package: 4302, paidCurrency: 1809, newUserRevenue: 1294, existingUserRevenue: 7681 },
      { date: "2024-03-19", monthlyPass: 2588, package: 4506, paidCurrency: 1846, newUserRevenue: 1428, existingUserRevenue: 7774 },
      { date: "2024-03-20", monthlyPass: 2634, package: 4573, paidCurrency: 1883, newUserRevenue: 1474, existingUserRevenue: 7867 },
      { date: "2024-03-21", monthlyPass: 2680, package: 4640, paidCurrency: 1920, newUserRevenue: 1520, existingUserRevenue: 7960 },
      { date: "2024-03-22", monthlyPass: 2726, package: 4707, paidCurrency: 1957, newUserRevenue: 1566, existingUserRevenue: 8053 },
      { date: "2024-03-23", monthlyPass: 2934, package: 5336, paidCurrency: 2188, newUserRevenue: 1736, existingUserRevenue: 9030 },
      { date: "2024-03-24", monthlyPass: 2981, package: 5406, paidCurrency: 2226, newUserRevenue: 1783, existingUserRevenue: 9127 },
      { date: "2024-03-25", monthlyPass: 2590, package: 4766, paidCurrency: 2068, newUserRevenue: 1609, existingUserRevenue: 8332 },
      { date: "2024-03-26", monthlyPass: 2622, package: 4570, paidCurrency: 1871, newUserRevenue: 1480, existingUserRevenue: 7930 },
      { date: "2024-03-27", monthlyPass: 2668, package: 4637, paidCurrency: 1908, newUserRevenue: 1526, existingUserRevenue: 8023 },
      { date: "2024-03-28", monthlyPass: 3270, package: 4704, paidCurrency: 1945, newUserRevenue: 1572, existingUserRevenue: 8116 },
      { date: "2024-03-29", monthlyPass: 3318, package: 4771, paidCurrency: 1982, newUserRevenue: 1618, existingUserRevenue: 8209 },
      { date: "2024-03-30", monthlyPass: 3569, package: 5419, paidCurrency: 2221, newUserRevenue: 1797, existingUserRevenue: 9215 },
      { date: "2024-03-31", monthlyPass: 3619, package: 5488, paidCurrency: 2259, newUserRevenue: 1844, existingUserRevenue: 9312 },
      { date: "2024-04-01", monthlyPass: 3507, package: 4826, paidCurrency: 2093, newUserRevenue: 1654, existingUserRevenue: 8488 },
      { date: "2024-04-02", monthlyPass: 3941, package: 5039, paidCurrency: 2130, newUserRevenue: 1802, existingUserRevenue: 8581 },
      { date: "2024-04-03", monthlyPass: 3992, package: 5106, paidCurrency: 2167, newUserRevenue: 1848, existingUserRevenue: 8674 },
      { date: "2024-04-04", monthlyPass: 2748, package: 4768, paidCurrency: 1970, newUserRevenue: 1624, existingUserRevenue: 8272 },
      { date: "2024-04-05", monthlyPass: 2794, package: 4835, paidCurrency: 2007, newUserRevenue: 1670, existingUserRevenue: 8365 },
      { date: "2024-04-06", monthlyPass: 3014, package: 5501, paidCurrency: 2254, newUserRevenue: 1858, existingUserRevenue: 9400 },
      { date: "2024-04-07", monthlyPass: 3061, package: 5571, paidCurrency: 2292, newUserRevenue: 1905, existingUserRevenue: 9498 },
      { date: "2024-04-08", monthlyPass: 2639, package: 4885, paidCurrency: 2118, newUserRevenue: 1700, existingUserRevenue: 8644 },
      { date: "2024-04-09", monthlyPass: 2978, package: 5103, paidCurrency: 2155, newUserRevenue: 1854, existingUserRevenue: 8737 },
      { date: "2024-04-10", monthlyPass: 3024, package: 5170, paidCurrency: 2192, newUserRevenue: 1900, existingUserRevenue: 8830 },
      { date: "2024-04-11", monthlyPass: 3070, package: 5237, paidCurrency: 2229, newUserRevenue: 1946, existingUserRevenue: 8923 },
      { date: "2024-04-12", monthlyPass: 3116, package: 5304, paidCurrency: 2266, newUserRevenue: 1992, existingUserRevenue: 9016 },
      { date: "2024-04-13", monthlyPass: 3054, package: 5584, paidCurrency: 2286, newUserRevenue: 1919, existingUserRevenue: 9586 },
      { date: "2024-04-14", monthlyPass: 3101, package: 6521, paidCurrency: 2517, newUserRevenue: 1966, existingUserRevenue: 9683 },
      { date: "2024-04-15", monthlyPass: 2663, package: 5699, paidCurrency: 2319, newUserRevenue: 1745, existingUserRevenue: 8800 },
      { date: "2024-04-16", monthlyPass: 3012, package: 5949, paidCurrency: 2356, newUserRevenue: 1906, existingUserRevenue: 8893 },
      { date: "2024-04-17", monthlyPass: 3058, package: 5234, paidCurrency: 2217, newUserRevenue: 1952, existingUserRevenue: 8986 },
      { date: "2024-04-18", monthlyPass: 3104, package: 5301, paidCurrency: 2254, newUserRevenue: 1998, existingUserRevenue: 9079 },
      { date: "2024-04-19", monthlyPass: 3150, package: 5368, paidCurrency: 2291, newUserRevenue: 2044, existingUserRevenue: 9172 },
      { date: "2024-04-20", monthlyPass: 3382, package: 6071, paidCurrency: 2553, newUserRevenue: 2250, existingUserRevenue: 10266 },
      { date: "2024-04-21", monthlyPass: 3429, package: 6141, paidCurrency: 2591, newUserRevenue: 2297, existingUserRevenue: 10363 },
      { date: "2024-04-22", monthlyPass: 2687, package: 5004, paidCurrency: 2168, newUserRevenue: 1790, existingUserRevenue: 8956 },
      { date: "2024-04-23", monthlyPass: 3046, package: 5231, paidCurrency: 2205, newUserRevenue: 1958, existingUserRevenue: 9049 },
      { date: "2024-04-24", monthlyPass: 3092, package: 5298, paidCurrency: 2242, newUserRevenue: 2004, existingUserRevenue: 9142 },
      { date: "2024-04-25", monthlyPass: 3138, package: 5365, paidCurrency: 2279, newUserRevenue: 2050, existingUserRevenue: 9235 },
      { date: "2024-04-26", monthlyPass: 3184, package: 5432, paidCurrency: 2316, newUserRevenue: 2096, existingUserRevenue: 9328 },
      { date: "2024-04-27", monthlyPass: 3422, package: 6153, paidCurrency: 2586, newUserRevenue: 2311, existingUserRevenue: 10451 },
      { date: "2024-04-28", monthlyPass: 4150, package: 6223, paidCurrency: 2624, newUserRevenue: 2358, existingUserRevenue: 10548 },
      { date: "2024-04-29", monthlyPass: 3580, package: 5468, paidCurrency: 2427, newUserRevenue: 2105, existingUserRevenue: 9607 },
      { date: "2024-04-30", monthlyPass: 4016, package: 5700, paidCurrency: 2464, newUserRevenue: 2280, existingUserRevenue: 9700 },
      { date: "2024-05-01", monthlyPass: 4265, package: 5362, paidCurrency: 2267, newUserRevenue: 2056, existingUserRevenue: 9298 },
      { date: "2024-05-02", monthlyPass: 4316, package: 5429, paidCurrency: 2304, newUserRevenue: 2102, existingUserRevenue: 9391 },
      { date: "2024-05-03", monthlyPass: 4367, package: 5496, paidCurrency: 2341, newUserRevenue: 2148, existingUserRevenue: 9484 },
      { date: "2024-05-04", monthlyPass: 3462, package: 6236, paidCurrency: 2618, newUserRevenue: 2372, existingUserRevenue: 10637 },
      { date: "2024-05-05", monthlyPass: 3509, package: 6306, paidCurrency: 2657, newUserRevenue: 2419, existingUserRevenue: 10734 },
      { date: "2024-05-06", monthlyPass: 3024, package: 5527, paidCurrency: 2452, newUserRevenue: 2151, existingUserRevenue: 9763 },
      { date: "2024-05-07", monthlyPass: 3402, package: 5764, paidCurrency: 2489, newUserRevenue: 2332, existingUserRevenue: 9856 },
      { date: "2024-05-08", monthlyPass: 3448, package: 5831, paidCurrency: 2526, newUserRevenue: 2378, existingUserRevenue: 9949 },
      { date: "2024-05-09", monthlyPass: 3494, package: 5898, paidCurrency: 2563, newUserRevenue: 2424, existingUserRevenue: 10042 },
      { date: "2024-05-10", monthlyPass: 3252, package: 5560, paidCurrency: 2366, newUserRevenue: 2200, existingUserRevenue: 9640 },
      { date: "2024-05-11", monthlyPass: 3502, package: 6318, paidCurrency: 2651, newUserRevenue: 2433, existingUserRevenue: 10822 },
      { date: "2024-05-12", monthlyPass: 3548, package: 6388, paidCurrency: 2689, newUserRevenue: 2480, existingUserRevenue: 10919 },
      { date: "2024-05-13", monthlyPass: 3048, package: 5587, paidCurrency: 2477, newUserRevenue: 2196, existingUserRevenue: 9919 },
      { date: "2024-05-14", monthlyPass: 3436, package: 5828, paidCurrency: 2514, newUserRevenue: 2384, existingUserRevenue: 10012 },
      { date: "2024-05-15", monthlyPass: 3482, package: 5895, paidCurrency: 2551, newUserRevenue: 2430, existingUserRevenue: 10105 },
      { date: "2024-05-16", monthlyPass: 3528, package: 5962, paidCurrency: 2588, newUserRevenue: 2476, existingUserRevenue: 10198 },
      { date: "2024-05-17", monthlyPass: 3574, package: 6029, paidCurrency: 2625, newUserRevenue: 2522, existingUserRevenue: 10291 },
      { date: "2024-05-18", monthlyPass: 3830, package: 6806, paidCurrency: 2918, newUserRevenue: 2764, existingUserRevenue: 11502 },
      { date: "2024-05-19", monthlyPass: 3588, package: 6471, paidCurrency: 2722, newUserRevenue: 2541, existingUserRevenue: 11104 },
      { date: "2024-05-20", monthlyPass: 3072, package: 5646, paidCurrency: 2502, newUserRevenue: 2241, existingUserRevenue: 10075 },
      { date: "2024-05-21", monthlyPass: 3470, package: 5892, paidCurrency: 2539, newUserRevenue: 2436, existingUserRevenue: 10168 },
      { date: "2024-05-22", monthlyPass: 3516, package: 5959, paidCurrency: 2576, newUserRevenue: 2482, existingUserRevenue: 10261 },
      { date: "2024-05-23", monthlyPass: 3562, package: 6026, paidCurrency: 2613, newUserRevenue: 2528, existingUserRevenue: 10354 },
      { date: "2024-05-24", monthlyPass: 3608, package: 6093, paidCurrency: 2650, newUserRevenue: 2574, existingUserRevenue: 10447 },
      { date: "2024-05-25", monthlyPass: 3869, package: 6888, paidCurrency: 2951, newUserRevenue: 2825, existingUserRevenue: 11687 },
      { date: "2024-05-26", monthlyPass: 3916, package: 6958, paidCurrency: 2989, newUserRevenue: 2872, existingUserRevenue: 11784 },
      { date: "2024-05-27", monthlyPass: 3384, package: 6111, paidCurrency: 2761, newUserRevenue: 2556, existingUserRevenue: 10726 },
      { date: "2024-05-28", monthlyPass: 4230, package: 5956, paidCurrency: 2564, newUserRevenue: 2488, existingUserRevenue: 10324 },
      { date: "2024-05-29", monthlyPass: 4279, package: 6023, paidCurrency: 2601, newUserRevenue: 2534, existingUserRevenue: 10417 },
      { date: "2024-05-30", monthlyPass: 4328, package: 6090, paidCurrency: 2638, newUserRevenue: 2580, existingUserRevenue: 10510 }
    ] as ChartData30Days[],
  
    // Zone B: 파이 차트용 (국가별 매출 비율)
    countryRatio: [
      { country: "KR", ratio: 55 },
      { country: "US", ratio: 25 },
      { country: "JP", ratio: 15 },
      { country: "ETC", ratio: 5 },
    ] as CountryRevenue[],
  
    // Zone C: 테이블용 (최근 구매 기록)
    recentPurchases: [
      { id: "TX001", userName: "게임마스터", item: "VIP 주간 패스", amount: 9900, date: "2024-05-01 09:07" },
      { id: "TX002", userName: "힐러구함", item: "영웅 소환 패키지", amount: 55000, date: "2024-05-01 10:14" },
      { id: "TX003", userName: "드래곤슬레이어", item: "성장 패키지", amount: 33000, date: "2024-05-01 11:21" },
      { id: "TX004", userName: "마법사의탑", item: "스타터 패키지", amount: 9900, date: "2024-05-02 12:28" },
      { id: "TX005", userName: "궁수왕자", item: "요리 재료 패키지", amount: 7500, date: "2024-05-02 13:35" },
      { id: "TX006", userName: "길드장군", item: "크리스탈 1000개", amount: 10000, date: "2024-05-02 14:42" },
      { id: "TX007", userName: "어둠의기사", item: "크리스탈 5000개", amount: 45000, date: "2024-05-03 15:49" },
      { id: "TX008", userName: "요리사왕", item: "마나 스톤 2000개", amount: 18000, date: "2024-05-03 16:56" },
      { id: "TX009", userName: "불꽃마법사", item: "HP 물약 번들", amount: 4500, date: "2024-05-03 17:03" },
      { id: "TX010", userName: "수호기사", item: "전설 무기 상자", amount: 89000, date: "2024-05-04 18:10" },
      { id: "TX011", userName: "달빛도적", item: "길드 강화 재료", amount: 22000, date: "2024-05-04 19:17" },
      { id: "TX012", userName: "초보용사123", item: "보스 레이드 티켓", amount: 12000, date: "2024-05-04 08:24" },
      { id: "TX013", userName: "게임마스터", item: "스킨: 황금 갑옷", amount: 28000, date: "2024-05-05 09:31" },
      { id: "TX014", userName: "힐러구함", item: "펫 알 10개", amount: 25000, date: "2024-05-05 10:38" },
      { id: "TX015", userName: "드래곤슬레이어", item: "화살 무제한 7일", amount: 6600, date: "2024-05-05 11:45" },
      { id: "TX016", userName: "마법사의탑", item: "프리미엄 월간 패스", amount: 15000, date: "2024-05-06 12:52" },
      { id: "TX017", userName: "궁수왕자", item: "VIP 주간 패스", amount: 9900, date: "2024-05-06 13:59" },
      { id: "TX018", userName: "길드장군", item: "영웅 소환 패키지", amount: 55000, date: "2024-05-06 14:06" },
      { id: "TX019", userName: "어둠의기사", item: "성장 패키지", amount: 33000, date: "2024-05-07 15:13" },
      { id: "TX020", userName: "요리사왕", item: "스타터 패키지", amount: 9900, date: "2024-05-07 16:20" },
      { id: "TX021", userName: "불꽃마법사", item: "요리 재료 패키지", amount: 7500, date: "2024-05-07 17:27" },
      { id: "TX022", userName: "수호기사", item: "크리스탈 1000개", amount: 10000, date: "2024-05-08 18:34" },
      { id: "TX023", userName: "달빛도적", item: "크리스탈 5000개", amount: 45000, date: "2024-05-08 19:41" },
      { id: "TX024", userName: "초보용사123", item: "마나 스톤 2000개", amount: 18000, date: "2024-05-08 08:48" },
      { id: "TX025", userName: "게임마스터", item: "HP 물약 번들", amount: 4500, date: "2024-05-09 09:55" },
      { id: "TX026", userName: "힐러구함", item: "전설 무기 상자", amount: 89000, date: "2024-05-09 10:02" },
      { id: "TX027", userName: "드래곤슬레이어", item: "길드 강화 재료", amount: 22000, date: "2024-05-09 11:09" },
      { id: "TX028", userName: "마법사의탑", item: "보스 레이드 티켓", amount: 12000, date: "2024-05-10 12:16" },
      { id: "TX029", userName: "궁수왕자", item: "스킨: 황금 갑옷", amount: 28000, date: "2024-05-10 13:23" },
      { id: "TX030", userName: "길드장군", item: "펫 알 10개", amount: 25000, date: "2024-05-10 14:30" },
      { id: "TX031", userName: "어둠의기사", item: "화살 무제한 7일", amount: 6600, date: "2024-05-11 15:37" },
      { id: "TX032", userName: "요리사왕", item: "프리미엄 월간 패스", amount: 15000, date: "2024-05-11 16:44" },
      { id: "TX033", userName: "불꽃마법사", item: "VIP 주간 패스", amount: 9900, date: "2024-05-11 17:51" },
      { id: "TX034", userName: "수호기사", item: "영웅 소환 패키지", amount: 55000, date: "2024-05-12 18:58" },
      { id: "TX035", userName: "달빛도적", item: "성장 패키지", amount: 33000, date: "2024-05-12 19:05" },
      { id: "TX036", userName: "초보용사123", item: "스타터 패키지", amount: 9900, date: "2024-05-12 08:12" }
    ] as RecentPurchase[],
  };
