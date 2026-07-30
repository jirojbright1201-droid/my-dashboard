// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
// schema earningsReviews: id/date/ticker/company/quarter/reportDate/verdict/verdictLine/metrics/trend/guidance/positives/concerns/discussion/sources/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวงบใหม่ (เพิ่ม 23 ก.ค. 2026) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
// schema companyDeepDives: id/date/ticker/company/sector/tagline/overview/technology/marketSummary/competitors/financialsSummary/financialMetrics/financialTrend/leadership/investors/catalysts/risks/caveats — append-only ต่อท้ายทุกครั้งที่รีเสิร์ชบริษัทใหม่ (เพิ่ม 24 ก.ค. 2026, ตัด analystSummary/ratingBuy/ratingHold/ratingSell/priceTarget*/sources ออก 24 ก.ค. 2026 — jiroj ขอเอา Analyst Sentiment กับ Sources ออกจาก dashboard) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
window.INVESTMENT_DATA = {
  "briefs": [],
  "portfolioReviews": [],
  "earningsReviews": [
{
      "id": "er0001",
      "date": "2026-07-30",
      "ticker": "SOFI",
      "company": "SoFi Technologies, Inc.",
      "quarter": "Q2 2026",
      "reportDate": "2026-07-29",
      "verdict": "beat",
      "verdictLine": "รายได้และกำไรต่อหุ้นสูงกว่าประมาณการของนักวิเคราะห์ทั้งคู่ รายได้โต 40% เทียบปีก่อน สูงกว่าประมาณการราว 9% อย่างไรก็ตาม ราคาหุ้นปรับตัวลงหลังการประกาศผลประกอบการ",
      "metrics": [
        {
          "label": "Revenue",
          "actual": "$1.21B",
          "est": "$1.11B",
          "deltaPct": "+8.6%",
          "dir": "pos"
        },
        {
          "label": "EPS",
          "actual": "$0.12",
          "est": "$0.11",
          "deltaPct": "+9.1%",
          "dir": "pos"
        }
      ],
      "trend": [
        {
          "label": "Q3'25",
          "value": 950
        },
        {
          "label": "Q4'25",
          "value": 1013
        },
        {
          "label": "Q1'26",
          "value": 1087
        },
        {
          "label": "Q2'26",
          "value": 1206
        }
      ],
      "guidance": {
        "priorLabel": "FY26 Revenue Guidance (ให้ไว้ตอนประชุม Q1 2026)",
        "priorVal": "~$4.655B",
        "newLabel": "FY26 Revenue Guidance (ปรับใหม่รอบนี้)",
        "newVal": "$4.75B–$4.85B",
        "deltaPct": "~+3.1%",
        "dir": "pos"
      },
      "managementQuotes": [
        {
          "quote": "We had nothing short of an exceptional quarter. Q2 was our 19th consecutive quarter exceeding the rule of 40 with a score of 70.",
          "translation": "ไตรมาสนี้ยอดเยี่ยมมากจริงๆ เป็นไตรมาสที่ 19 ติดต่อกันแล้วที่เราทำ Rule of 40 (เกณฑ์รวมอัตราการเติบโตของรายได้กับมาร์จิ้นกำไรต้องได้อย่างน้อย 40) ผ่านได้สบายๆ ที่คะแนน 70",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "We are starting to hit escape velocity on our path to be the winner that takes most in digital financial services.",
          "translation": "เรากำลังเริ่มเร่งความเร็วจนหลุดวงโคจร บนเส้นทางที่จะเป็นผู้ชนะที่กินส่วนแบ่งตลาดเกือบทั้งหมดในธุรกิจการเงินดิจิทัล",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "I believe we will achieve 20%–30% return on tangible common equity. It's just a matter of when, not if.",
          "translation": "ผมเชื่อว่าเราจะทำผลตอบแทนต่อส่วนของผู้ถือหุ้นที่จับต้องได้ (ROTCE) ได้ถึง 20-30% เป็นแค่เรื่องของเวลา ไม่ใช่เรื่องว่าจะทำได้หรือเปล่า",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "There are just too many large attractive growth areas for us to invest versus adding even more profitability.",
          "translation": "ตอนนี้มีโอกาสเติบโตก้อนใหญ่ๆ ที่น่าลงทุนเยอะเกินกว่าจะเลือกเก็บเป็นกำไรเพิ่มเฉยๆ",
          "speaker": "Chris Lapointe",
          "title": "CFO"
        },
        {
          "quote": "We believe that we can operate comfortably within our target capital range without the need to raise capital.",
          "translation": "เรามั่นใจว่าจะบริหารเงินทุนอยู่ในกรอบเป้าหมายได้สบายๆ โดยไม่จำเป็นต้องระดมทุนเพิ่ม",
          "speaker": "Chris Lapointe",
          "title": "CFO"
        }
      ],
      "transcriptExcerpt": {
        "text": "Opening remarks — Anthony Noto (CEO):\n\"Thank you and good morning, everyone. I'm pleased to share that we had nothing short of an exceptional quarter. Q2 was our 19th consecutive quarter exceeding the rule of 40 with a score of 70.\"\n\n\"This included exceptional revenue growth of 40% year-over-year and a 30% EBITDA margin. Our team has continued to execute at a remarkable level and our business mix has proven its durability, driving record growth and profitability in the face of a volatile interest rate environment.\"\n\n\"Few businesses have maintained such a strong combination of growth and returns for it has been nearly five years, and it still feels like we're just getting started.\"\n\nPrepared remarks — Chris Lapointe (CFO), opening:\n\"Thank you, Anthony. We had a strong second quarter and have great momentum heading into the back half of 2026. Our innovation and brand building continue to power exceptionally strong revenue growth. In the second quarter, adjusted net revenue grew 40% to $1.2 billion.\"\n\nPrepared remarks — Chris Lapointe (CFO), segment performance:\n\nFinancial Services: \"For the second quarter, Financial Services net revenue was $466 million, up 29% year-over-year. Contribution profit was $213 million, up 13% from last year. Contribution margin was 46%.\"\n\nTechnology Platform: \"For the second quarter, we delivered net revenue of $85 million, up 13% from the prior quarter. Contribution profit was $12 million at a contribution margin of 14%.\"\n\nLending: \"For Q2, adjusted net revenue for the segment was $712 million, up 59% from the same period last year. Contribution profit was $399 million with a 55% contribution margin.\"\n\nPrepared remarks — Chris Lapointe (CFO), credit performance:\n\"For personal loans, we saw very strong credit performance during the quarter. Excluding the impact of delinquent loan sales, the estimated all-in annualized net charge-off rate was 3.7%. This 70 basis point decrease from last quarter was driven by an improvement in the underlying credit performance, as well as growth in average loans on the balance sheet. Including the impact from the DQ sales, the net charge-off rate was 2.62%. This is down 41 basis points from the first quarter and 21 basis points from the second quarter of 2025. The on-balance sheet 90-day delinquency rate was 40 basis points, down seven basis points from last quarter.\n\nFor student loans, the annualized charge-off rate was 61 basis points, down four basis points from the prior quarter. The on-balance sheet 90-day delinquency rate was just 11 basis points, up one basis point from the prior quarter.\"\n\nPrepared remarks — Chris Lapointe (CFO), balance sheet & capital:\n\"Turning to our balance sheet. In the second quarter, total assets grew by $7.2 billion. This was driven primarily by $5.8 billion of loan growth and roughly $800 million of growth in cash equivalents, and investment securities. Total company-wide cash at quarter end was $3.6 billion.\n\nOn the liability side, total deposits grew by $5.3 billion to $45.5 billion, which included strong growth in member deposits. Our net interest margin was 5.98% for the quarter, up 4 basis points sequentially. This included a 7 basis point increase in average asset yields, partially offset by a 1 basis point increase in cost of funds. We continue to expect a healthy net interest margin above 5% for the foreseeable future. In terms of our regulatory capital ratios, we are very well capitalized. Our total capital ratio of 18.8% at quarter end is well above the regulatory minimum of 10.5%, as well as our additional internal stress buffer. Over the medium term, we expect to efficiently deploy our excess capital into high-returning assets while letting our risk-based capital ratio normalize toward the low to mid-teens. Tangible book value grew $4.2 billion year-over-year to $9.5 billion.\n\nThe tangible book value per share at quarter end is $7.34, up from $4.72 a year ago, a 56% increase.\"\n\nPrepared remarks — Chris Lapointe (CFO), full-year 2026 guidance:\n\"For the full year 2026, we now expect to deliver adjusted net revenue of $4.75 billion-$4.85 billion, which equates to year-over-year growth of approximately 32%-35%. This is up from our prior guidance of approximately 30% year-over-year growth. We continue to expect to deliver adjusted EBITDA of approximately $1.6 billion, which equates to an adjusted EBITDA margin of approximately 33%-34%. Adjusted net income of approximately $825 million, which equates to a net income margin of approximately 17%. The EPS of approximately $0.60.\"\n\n\"Overall, Q2 was a strong quarter, and we continue to have strong momentum in our business. Let's now begin the Q&A.\"\n\nPrepared remarks — product updates:\n\nSoFi Plus: \"SoFi Plus is our premium membership offering that brings the best of every SoFi product into one experience with a value that is unrivaled in the market. At the start of the second quarter, we relaunched SoFi Plus with significantly enhanced benefits in each of our products. For example, SoFi Money at 4.5% interest and SoFi Invest with a 1% match while fully transitioning the product to a paid subscription model. The results have exceeded our expectations. After just one quarter, we surpassed 200,000 paid subscribers with most of the growth coming from existing members who are upgrading their memberships.\"\n\nSoFi Coach: \"SoFi Coach brings together three things no other company can. The full picture of a member's personal finances across their SoFi products and third-party products, the trust and security of a regulated bank, and soon, the ability to perform actions on behalf of our members. The result is personalized financial guidance across a member's entire financial life that helps them achieve the most critical success factor on their way to realizing their ambitions, which is spending less than they make and investing the rest.\"\n\nSoFiUSD and Big Business Banking: \"We have been pioneers in this space, becoming the first nationally licensed bank to launch crypto trading and our own stablecoin in SoFiUSD. In the second quarter, we began settling our trading business in SoFiUSD and in big business banking, we began processing transactions on the SoFi Exchange Network, enabling our first commercial clients to move money in real time 24/7.\"\n\nQ&A session:\n\nQ1 — Devin Ryan, Citizens Bank: \"Thanks. Good morning, Anthony and Chris. First off, congratulations on the Notre Dame partnership, my alma mater. Good to see that yesterday. You got a lot of attention. Question just on loan platform, really want to focus on some of the new capabilities with SMB and home equity and the new agreements that you guys have recently announced. Can you just give a little bit of context around the capacity that you see in kind of some of these newer categories, also how quickly SoFi can build origination volume into that capacity, just also how we should think about kind of the fee economics in these new categories as you kind of expand beyond personal loans? Thanks.\"\n\nChris Lapointe (CFO): \"Yep, absolutely. Thanks, Devin. In terms of Loan Platform Business, that was originally started a few years ago primarily as a referral channel where we were sending all of our declines to a marketplace and generating a fee. That evolved over time to where we started to originate on behalf of others in meaningful scale from an unsecured personal loan perspective. I would say, and I've said this consistently, the Nirvana state for the LPB business is to be able to go to investors with a menu of options and asset types that allows them to pick and choose exactly what they would like from both a risk and reward and return profile perspective. One of the key things that we needed to achieve was to start expanding Loan Platform Business into other asset types.\n\nThis is the first quarter where we were able to do so by introducing the SMB partnerships. There are two of them. One is with BasePoint Capital for $3 billion over three years, the other is with an undisclosed party for several hundred million dollars. We are also introducing Home Equity Lines of Credit to the mix as well in the coming days. In terms of the overall size and scale and opportunity and our ability to originate into that, we're just starting to originate in meaningful scale on the SMB side. There's considerable demand from an application start perspective. You would expect to see economics in the range of where we're executing today to maybe slightly better. On the closed-end seconds and mortgage side, similar story. We're already originating at a pretty good clip right now on a monthly basis.\n\nThe partnerships that we're talking about are in the $100 million-$200 million per month, we're talking to several parties. We certainly have the ability to originate into that. Again, from an economics perspective, we don't disclose that by party, you could expect it to be similar to where we're executing today.\"\n\nAnthony Noto (CEO), follow-up: \"The other thing I would add is that as we continue to build out a more diversified portfolio of Loan Platform Businesses, we build new relationships that can benefit existing Loan Platform Businesses. The SMB business is one that we think we can be incredibly competitive on, similar to personal loans and credit cards. Most SMB lenders are charging exorbitant rates of over 30%. We think we can operate meaningfully below that and take significant market share. If you think about our portfolio of loans and originations more broadly, we are really taking massive market share from high return, high profit margin types of products. In personal loans, we're underwriting WAC at about 12% compared to credit card at 25%. That's an incredibly compelling value proposition for any individual consumer. In SMB, as I mentioned, we could be 10 points below where the pricing is on SMB.\n\nClosed end, we can be more competitive than others. Because we're more competitive on price, we get higher quality borrowers, which will only reinforce the productivity loop of originating high-quality borrowers, delivering great return assets to our partners, putting great return assets on our balance sheet, driving capital that can continue to fund that. We're very close to that whole equation playing out.\"\n\nQ2 — Andrew Jeffrey, William Blair: \"Thank you. Good morning. Great to see the momentum you have in the business. Anthony, kind of a high-level question for you. I know the company has been sort of hyper-focused on driving members, given the size of the TAM, now it seems that cross-buys reached a pretty important inflection point. Is this the time to sort of focus on monetization sort of at the margin versus member growth, or do you think you walk and chew gum and we see both metrics rise over the next couple of years?\"\n\nAnthony Noto (CEO): \"It's an important point that you bring up. It was an important inflection point for us in this quarter. It started in Q1. We didn't want to overemphasize in the Q1 relative to Q2. Make no mistake about it, the first half of this year has proven that our broad-based everything app strategy is working. We've seen improvement in products per member in Q1 and Q2. We continue to expect that to happen for the foreseeable future. We have the right portfolio of products where people are organically acquiring the next product. If you think about Relay and you think about SoFi Money, those are tip-of-the-sword products that are broadly appealing. We have over 7 million Money members now, over 6 million Relay members.\n\nThe more Money members we bring in, the more Relay members we bring in, the more downstream benefit we get in SoFi Invest and SoFi Credit Card, and SoFi SMB, as well as all the loan products. Those acquisition costs are basically zero on those other products, which basically doubles the profitability on the loan side. There's a great flywheel here at work, and what's changed this year is that the SoFi Plus product, the SoFi Crypto product, are absolutely driving product per member organically. As we mentioned in the remarks, SoFi Plus relaunched. We're already at over 200,000 paying members, which is, on a run rate basis, going to be over $24 million a year, and it's growing very rapidly.\n\nThe most important thing is that 85% of those new SoFi Plus members are existing members, and a quarter of them are taking out another product after they take out SoFi Plus. If an existing member takes out SoFi Plus, they have at least two products since they're existing, and then 25% of them are taking out another product. Layer on top of that, more broadly appealing products like crypto and more broadly appealing products like SMB and now big business banking, you can see the flywheel really working. Our growth is going to be driven by members, by products per member, and by revenue per product. All three working for us, and you saw that in the quarter.\"\n\nQ3 — John Hecht, Jefferies: \"Hey, guys. Good quarter. Thanks very much for taking the question. Anthony, I'm wondering if maybe you can give us an update on the competitive, excuse me, the competitive environment and customer acquisition costs and channels, and how are those trends going?\"\n\nAnthony Noto (CEO): \"Outside the loan business, the competition is very benign. Our customer acquisition costs are staying pretty stable. The team's doing a great job of really optimizing unit economics and driving efficient scale in customers. The fact that we're driving 35% year-over-year growth in members and over 40% growth in products and really keeping CAC constant is a function of the great data analytics we have and the value prop that we have. Each one of our products we absolutely designed to be the best of breed on its own, both from a value proposition to consumer as well as unit economics. We're indifferent in what product they take first. We're seeing continued strong demand in our channels at stable pricing in all of the financial services products. The lending products are definitely more competitive, but we have very unique products.\n\nIn personal loans, we're really not competing with big banks. They don't offer personal loans, primarily because they have these huge credit card businesses that they don't want to cannibalize. We're kind of competing with the smaller companies that don't have as much capital, and they have higher cost of funding than us. We've competed really well. Don't get me wrong, I'm focused on funnels and pricing every day in the PL business. The student loan business doesn't really have a competitor in the home loan business. Overall, pretty benign environment at the top of the funnel. Bottom of the funnel, nothing's changed, it's always been competitive on pricing, and we're pretty nimble and have a significant advantage in lower funding costs than others.\n\nNot to mention, a large percentage of home loans are cross-bought from existing members, and increasingly a higher percentage of personal loans is cross-bought, again, without customer acquisition costs.\"\n\nQ4 — Dan Dolev, Mizuho: \"Hey, guys. Really nice results. Congrats. Just wanted to ask, maybe Chris, can you walk us through the rationale of not raising the EBITDA? Obviously, results are super strong. Just some color on that I think a lot of investors are asking. Thank you so much, and congrats again.\"\n\nChris Lapointe (CFO): \"Yep, absolutely. Thanks, Dan. We ended up raising guidance from a revenue perspective about $100 million-$200 million. That obviously reflects the continued strong execution and strong demand that we're seeing across the entire business. As we've said before, when we see opportunities to deploy capital at attractive returns, we're going to lean into them, and that's what we're doing today. There are just too many large attractive growth areas for us to invest versus adding even more profitability. The profitability opportunity is not going to go away, but choosing not to invest today would come at the expense of capturing that growth opportunity in the future. The incremental revenue gives us, obviously, the additional flexibility to invest in initiatives that we believe will drive long-term growth while maintaining the EBITDA and EPS guidance that we've provided.\"\n\nAnthony Noto (CEO), follow-up: \"Dan, the other thing I'd say is we don't want to over-optimize for the actual EPS that we hit or the actual EBITDA that we hit relative to these bigger growth opportunities. We also do need to be balanced relative to the environment. While we couldn't be more positive about the demand for our products, the performance that we're driving with them, the credit trends we're seeing, the spending trends we're seeing, as well as the investing trends, all of those things are green and up and to the right, that's what's allowing us to drive such strong demand. It's not coming at higher costs, which I think is what a lot of people will point to. The incremental investment is on new growth opportunities. This year, we've launched a number of things that were never in our 2026 plan. We just launched big business banking.\n\nWe launched SMB. We launched SoFiUSD. We launched SoFi Crypto. We're leaning into SoFi Plus because of how well it's doing. That momentum is absolutely continuing. The other thing I would just say is we entered the year expecting rate cuts. We're now expecting 2 rate increases. We've not only maintained our guidance for revenue and profitability, we've exceeded expectations on the revenue side. When we think about the back half of the year, I don't know if there's going to be 2 rate cuts. If they are, we're going to be fine. Sorry, 2 rate increases. If there are, we're going to be fine. If there are no rate increases, we probably have upside to the bottom line, but we have the cushion in our guidance to be prepared to deliver regardless of the environment.\"\n\nQ5 — Kyle Peterson, Needham: \"Great. Good morning. Thank you guys for taking the question. Wanted to talk on the Loan Platform Business. I think this is the second quarter in a row you guys have talked about the demand is really good from the buyers, but you guys aren't necessarily fulfilling some of the upsized requests based on capital levels and unit economics for you guys. I guess how should we think about should that continue on the personal loan side moving forward, as you guys still have really strong capital ratios? I guess, is any of that volume decision impacted by HELOC and SMB starting to get ramped up on the platform? Thank you.\"\n\nChris Lapointe (CFO): \"Yeah. Absolutely. Thanks, Kyle. I'd say on how we're feeling about the PL business as it relates to LPB, we're happy with that level of volume. We're able to meet all of our contractual commitments and then some. Where you're going to start to see more meaningful growth is in some of these other asset types, and I walked through those earlier in the call during my prepared remarks and in the first question. As it relates to some of the capital consumption questions and how that pertains to LPB, what I would say is that we're self-funded through our guidance period and the medium-term operating plan that we've laid out. As our profitability continues to improve, our organic capital generation is going to continue to increase as well.\n\nCombined with continued growth in our capital-light businesses that Anthony's mentioned, as well as the flexibility that we have in how we monetize our originations, whether that's through the LPB program or on the balance sheet, we believe that we can operate comfortably within our target capital range without the need to raise capital under our current operating plan.\"\n\nQ6 — Peter Christensen, Citi: \"Thank you. Good morning. Really nice results here. Anthony, I'm curious. With introducing some of these more commercial-like products, how should we think about the cross-buy flywheel here, or I guess in the future, and putting it around some of these newer offerings? Is it, 'Hey, this is a small business. We can connect to some of the proprietors there,' maybe for personal banking? Or do you envision some additional services that could serve that market to increase cross-buy?\"\n\nAnthony Noto (CEO): \"Yeah. What I'd say is the following. The most common sort of path or stage someone goes through is they come in through SoFi Relay or SoFi Money. If they come through Relay, the most prominent next product is going to be SoFi Money. If they come in through SoFi Money, there's going to be a path to Relay or to SoFi Invest or to Loans. SMB really was born out of the fact that a large percentage of our members actually are small business operators. Back during COVID, when the government provided PPP loans, we got a significant amount of demand for applications on PPP loans, even though we were not in the SMB business. We actually stood up an application process that met the government's application criteria and helped pass on that demand to lenders.\n\nThen on the back of that, we built a marketplace so that we actually get paid for that referral process that we're doing. The SMB business is very much synergistic to the rest of our business. I would think of it as just another use case for an individual to satisfy the needs they have from a borrowing standpoint. We'll obviously follow this up with checking and savings in SMB, and other products that are ancillary to that. It will add to the flywheel. Big business banking I don't think is truly appreciated by people outside the company. We were looking to partner with marketplaces and market makers in crypto, and everyone we talked to said, 'Can you please be our actual bank? Can you build a fiat and crypto banking capability that's API-driven?' That's where that business was born out of.\n\nNot only will it be a business on its own, it'll drive second-order benefits in driving more usage of SoFiUSD. The SoFiUSD product is going to be driven, obviously, by the net interest income from leaving that cash at the Fed Bank and earning Fed funds on it. We have a number of pieces of demand for SoFiUSD. We have big business banking, which is now up and running, and people can use SoFiUSD as a form of payment in those payment rails. We have our crypto business, which is actually settling in SoFiUSD. On the consumer side, we have our debit and credit card with Mastercard. We'll begin settling in SoFiUSD with Mastercard in the coming weeks. These businesses are starting to layer on top of each other, and there's synergies across them.\"\n\nQ7 — Will Nance, Goldman Sachs: \"Hey, guys. Thanks for taking the question. I wanted to ask a question on the SoFi Plus commentary that you had and some of the membership growth that you guys have seen. I was hoping you could maybe talk through just the profile of the customers that are adopting the product. What have you seen from a wallet share perspective or an engagement perspective, and have you seen things like average deposit balances increasing, or engagement with the SoFi platform increasing on the back of some of those sign-ups? Thanks.\"\n\nAnthony Noto (CEO): \"Yeah. Our hope when we relaunched SoFi Plus is that it would increase the awareness of the other products that we offered that existing members may not be aware of, or new members may not be aware of, because SoFi Plus is meant to be the best of every individual product. If you sign up for SoFi Plus compared to just SoFi Money, you get a higher interest rate, you get other bells and whistles. If you sign up for SoFi Plus compared to just SoFi Invest, you get a 1% match. In each product, credit card, better rewards, et cetera. Of the 206,000 SoFi Plus members that we reported in the quarter, 85% of them are existing members. It's the same demographic of our member base already because they are members.\n\nThe 25% incremental purchases of a new product after SoFi Plus, primarily the thing that's benefiting the most is Invest, and that's really encouraging. That means we're increasing share of wallet. We have investors for the first time that are novice to new investors, but we're also getting investors that are transferring their money because of the match. Secondarily, the SoFi Money product is the product that benefits if SoFi Plus is in that 15% bucket. If SoFi Plus is the first product of a member, the second product that they're buying is SoFi Money.\n\nIn terms of the actual second-order effects of their existing activity, a SoFi Money member that takes out SoFi Plus, one-fourth of them are taking out a third product, but we're actually seeing increases in their deposits on the back of that SoFi Plus subscription sign-up, and we're seeing increases in AUM as well, and we're seeing increases in spending. There is a benefit for more products being taken out from SoFi Plus, and there's a benefit for more engagement as defined by more deposits, more AUM, and more spending. Here's a really interesting data point. I looked back at the Q1 2021 cohort.\n\nOf the SoFi Money members in the Q1 2021 cohort that became SoFi Money members that quarter, with the launch of SoFi Plus, we increased the product per member of that cohort by one product in the quarter, which is, if you think about it, that's almost five years old, that customer that was acquired, and they added one product for the entire cohort in the quarter. It's having a really strong impact, and that's why we mentioned in the earnings results and in my comments that we're seeing an inflection point benefiting from the flywheel. Crypto's also contributing to that flywheel as well as a new product.\"\n\nQ8 — Matt Cote, Truist: \"Hey. Good morning, guys. Thanks for taking the question. Anthony, I just wanted to ask about the spend down of that excess capital that you guys have talked about. You're in that advantageous position where you have a really strong CET1 ratio, a lot of capital to spend, but you've brought down that CET1 ratio pretty quickly over the past couple quarters. Could you talk about just capital balance sheet growth and kind of the spend down and the pace of the spend down of that excess capital?\"\n\nAnthony Noto (CEO): \"Sure. I'll let Chris get into the numbers in more detail. One of the benefits of growing our balance sheet in Q1 and Q2 of this year is that we have very strong visibility into our revenue for 2027. That visibility is going to continue because if we maintain our balance sheet at this size, it's going to produce the net interest income that's being delivered today consistently over time. Barring a huge change in the economy or overall credit performance, we can kind of count on that revenue in the future. That's a really stable thing to have so we can, at a minimum, fund a significant amount of investments regardless of the environment that we're in.\n\nWhen people ask, 'Why are you putting loans on the balance sheet, why are you not doing everything through Loan Platform Business?' It's because we want to make sure we have revenue in the future that's visible, that can deliver no matter what, and it's 100% in our control. We layer a Loan Platform Business on top of that, not just in PL, but now SMB and closed-end seconds. It's a very incremental additive return on top of something that's very visible, and we have five years of history.\n\nI don't know if people heard the numbers that I mentioned about over $5 billion of cash net interest income from what we generated in Q1 of 2024 through Q2 of 2026. That's an astronomical number, especially where it's 2X greater than what the non-cash revenue was recorded as a premium over time, which shows that the loans are really performing. I'll let Chris talk about where the capital ratios will settle out, et cetera.\"\n\nChris Lapointe (CFO), follow-up: \"Yep. We exited the quarter at an 18.8% total risk-based capital ratio, which is our binding constraint. That's well above the regulatory limit of 10.5%. As I mentioned in my prepared remarks, we believe that having a risk-based capital ratio in the low to mid-teens is appropriate for this business longer term. Like I said a few minutes ago, based on our current operating plan and the guidance that we've provided, we feel really good about being able to operate within those confines without the need to raise capital. As you know, as we continue to expand profitability, our organic capital generation will continue to increase, and by continuing to scale our capital-light fee-based revenue streams, that will help as well.\"\n\nClosing remarks — Anthony Noto (CEO):\n\"In closing, Q2 marks a clear inflection point in our strategy where our Everything App is driving higher products per member, resulting in higher lifetime value, supporting superior levels of investment in our ability to offer more value to our members than anyone else in better rates, products, and services. This continuous reinforcing cycle of the financial services productivity fuels durable growth and high returns. The benefits of this strategy, in our view, are no longer theoretical or a leap of faith. They are 100% in our control via disciplined execution.\n\nI'm often asked why I buy the stock. The answer is simple: I believe we will achieve the returns that Chris walked through before of 20%-30% return on tangible common equity. It's just a matter of when, not if, the market can connect the dots to the attractive return potential of our business. Until then, we're going to keep our heads down and continue to execute and deliver for our members and our shareholders. Thank you. We look forward to talking to you next quarter.\"",
        "summaryTh": "คอลนี้เริ่มด้วยคำแถลงของ Anthony Noto (CEO) ที่ย้ำว่าไตรมาสนี้ยอดเยี่ยม ทำ Rule of 40 ได้ต่อเนื่องเป็นไตรมาสที่ 19 ตามด้วยคำแถลงของ Chris Lapointe (CFO) ที่ลงรายละเอียดผลงานแยกตาม 3 เซกเมนต์ (Financial Services/Technology Platform/Lending) คุณภาพสินเชื่อ งบดุล-เงินฝาก-capital ratio-tangible book value และปิดท้ายด้วยการปรับเป้าปี 2026 ขึ้น จากนั้นอัปเดตโปรดักต์ใหม่ (SoFi Plus, SoFi Coach, SoFiUSD, Big Business Banking) ช่วงถาม-ตอบมีนักวิเคราะห์ถามครบ 8 คำถาม ครอบคลุมการขยาย Loan Platform Business ไป SMB/HELOC เหตุผลที่ไม่ปรับเป้ามาร์จิ้น EBITDA ขึ้น การแข่งขันและต้นทุนหาลูกค้า cross-buy flywheel จาก SoFi Plus และการบริหารเงินกองทุน ปิดท้ายด้วยคำแถลงของ CEO ย้ำความเชื่อมั่นในเป้าผลตอบแทน 20-30% ต่อส่วนของผู้ถือหุ้น"
      },
      "trackRecord": [
        {
          "claim": "ตอนประชุม Q1 2026 ผู้บริหารเคยบอกไว้ว่า Q2 2026 รายได้ปรับปรุงจะโตประมาณ 30% เทียบปีก่อน",
          "verdict": "hit",
          "note": "ผลจริงออกมาโตถึง 40% เกินกว่าที่เคยบอกไว้ค่อนข้างมาก ถือว่าทำได้ดีกว่าที่สัญญาไว้"
        },
        {
          "claim": "ตอนประชุม Q1 2026 เคยบอกว่า Q2 2026 มาร์จิ้น adjusted EBITDA จะอยู่ราว 30%",
          "verdict": "hit",
          "note": "ผลจริงออกมาที่มาร์จิ้น 30% พอดี ตรงตามที่เคยระบุไว้"
        },
        {
          "claim": "ตอนประชุม Q1 2026 เคยบอกว่า Q2 2026 มาร์จิ้นกำไรสุทธิปรับปรุงจะอยู่ราว 12-13%",
          "verdict": "hit",
          "note": "กำไรสุทธิปรับปรุง 160 ล้านดอลลาร์ หารด้วยรายได้ปรับปรุง 1.21 พันล้านดอลลาร์ เท่ากับมาร์จิ้นราว 13% อยู่ในช่วงบนของที่เคยให้ไว้"
        }
      ],
      "positives": [
        {
          "label": "โตเกินคาดทุกตัวเลขหลัก",
          "note": "รายได้ กำไรต่อหุ้น และมาร์จิ้น EBITDA สูงกว่าทั้งเป้าที่บริษัทเคยให้ไว้เองและประมาณการของนักวิเคราะห์"
        },
        {
          "label": "ปรับเป้าทั้งปีขึ้นอีกรอบ",
          "note": "บริษัทปรับเป้ารายได้ทั้งปี 2026 ขึ้นต่อเนื่อง สะท้อนความมั่นใจของผู้บริหารต่อแนวโน้มธุรกิจในครึ่งปีหลัง"
        },
        {
          "label": "ฐานสมาชิกและสินเชื่อโตพร้อมกัน",
          "note": "สมาชิกใหม่ 1.1 ล้านคนในไตรมาสเดียว ถือเป็นสถิติสูงสุด ยอดปล่อยสินเชื่อรวมทำสถิติใหม่ที่ 14.8 พันล้านดอลลาร์เช่นกัน"
        }
      ],
      "concerns": [
        {
          "label": "ราคาหุ้นปรับตัวลงหลังประกาศงบ",
          "note": "แม้ตัวเลขจะดีกว่าคาดในทุกตัวชี้วัดหลัก ราคาหุ้นกลับปรับตัวลงทันทีหลังประกาศผล อาจสะท้อนความกังวลของนักลงทุนในประเด็นอื่น เช่นคุณภาพสินเชื่อ หรือระดับราคาหุ้นก่อนประกาศงบ"
        },
        {
          "label": "ไม่ปรับเป้ามาร์จิ้น EBITDA ขึ้นตามรายได้ที่โต",
          "note": "นักวิเคราะห์สอบถามในที่ประชุมว่าเหตุใดจึงไม่ปรับเป้ามาร์จิ้นกำไรขึ้นทั้งที่รายได้โตกว่าคาด ผู้บริหารชี้แจงว่าเลือกนำรายได้ส่วนเพิ่มไปลงทุนต่อยอดการเติบโตแทนการรับเป็นกำไรทันที"
        }
      ],
      "discussion": [
        "ราคาหุ้นที่ปรับตัวลงทั้งที่ผลประกอบการดีกว่าคาด สะท้อนความกังวลของตลาดในประเด็นใด — คุณภาพสินเชื่อ ความยั่งยืนของอัตราการเติบโต หรือระดับราคาหุ้นก่อนประกาศงบ",
        "การเลือกลงทุนต่อยอดการเติบโตแทนการรับมาร์จิ้นกำไรเพิ่มทันที เป็นการตัดสินใจที่เหมาะสมในระยะยาวหรือเป็นการเลื่อนประเด็นด้านประสิทธิภาพออกไป"
      ],
      "caveats": "ข้อมูลนี้ใช้ประกอบการตัดสินใจเท่านั้น ไม่ใช่คำแนะนำการลงทุนโดยตรง ตัวเลขอ้างอิงจากรายงานผลประกอบการ (earnings release) และรายงานข่าวสาธารณะ ณ วันที่ 29-30 กรกฎาคม 2026 ตัวเลขคาดการณ์ (consensus) ของ Revenue และ EPS อ้างอิงจากรายงานของ Investing.com"
    }
  ],
  "companyDeepDives": [
{
      "id": "cd0001",
      "date": "2026-07-30",
      "ticker": "SOFI",
      "company": "SoFi Technologies, Inc.",
      "sector": "Digital Consumer Banking & Fintech Platform",
      "tagline": "แพลตฟอร์มการเงินดิจิทัลครบวงจรที่รวมธนาคาร สินเชื่อ การลงทุน และโครงสร้างพื้นฐานฟินเทคไว้ในแอปเดียว ภายใต้ใบอนุญาตธนาคารของตัวเอง",
      "overview": "SoFi Technologies ก่อตั้งขึ้นในปี 2011 ในชื่อ Social Finance เริ่มต้นจากธุรกิจรีไฟแนนซ์สินเชื่อนักเรียน (student loan refinancing) ก่อนขยายมาเป็นแพลตฟอร์มการเงินดิจิทัลครบวงจร ให้บริการทั้งสินเชื่อส่วนบุคคล สินเชื่อบ้าน บัญชีเงินฝาก การลงทุน บัตรเครดิต และประกันภัย ผ่านแอปเดียว สำนักงานใหญ่อยู่ที่ซานฟรานซิสโก\n\nโมเดลธุรกิจแบ่งเป็น 3 กลุ่มหลัก: (1) Lending — สินเชื่อส่วนบุคคล นักเรียน และบ้าน เป็นธุรกิจดั้งเดิมที่ยังทำรายได้หลัก จุดต่างจากคู่แข่งฟินเทคทั่วไปคือ SoFi ใช้เงินฝากของตัวเอง (จากการมีใบอนุญาตธนาคาร) มาปล่อยกู้ ทำให้ได้ NIM (Net Interest Margin — ส่วนต่างระหว่างดอกเบี้ยรับจากการปล่อยกู้กับดอกเบี้ยจ่ายให้ผู้ฝากเงิน) สูงกว่า (2) Financial Services — บัญชีเงินฝาก, SoFi Invest, บัตรเครดิต, ประกันภัย เป็นกลุ่มที่โตเร็วสุดและใช้เป็นช่องทางครอสเซล (cross-sell — ขายสินค้าตัวอื่นต่อให้ลูกค้าเดิม) ต่อยอดจากลูกค้าที่เข้ามาใช้สินเชื่อ (3) Technology Platform — Galileo และ Technisys เป็นธุรกิจ B2B ที่ขายโครงสร้างพื้นฐานธนาคารดิจิทัลให้ฟินเทค/ธนาคารอื่นใช้ต่อ\n\nจุดเปลี่ยนสำคัญคือการได้ใบอนุญาตธนาคารแห่งชาติ (national bank charter) ในปี 2022 ทำให้ SoFi Bank เป็นธนาคารที่มี FDIC ค้ำประกันเงินฝากอย่างเป็นทางการ ต่างจากฟินเทคทั่วไปที่ต้องพึ่งธนาคารพันธมิตร (partner bank) — นี่คือฐานที่ทำให้ต้นทุนเงินทุนถูกลงและขยายสินเชื่อได้เร็วกว่าคู่แข่ง",
      "technology": [
        {
          "label": "Galileo",
          "note": "แพลตฟอร์มโครงสร้างพื้นฐานธนาคารแบบ API-first (เปิด API ให้เชื่อมต่อ) ครอบคลุมการออกบัตร ระบบชำระเงิน ตรวจจับการทุจริต และงานกำกับดูแล ขายเป็นบริการ Banking-as-a-Service ให้ฟินเทค/ธนาคารอื่นหลายสิบราย"
        },
        {
          "label": "Technisys (Cyberbank)",
          "note": "ระบบแกนธนาคาร (core banking) แบบ cloud-native ที่ให้สถาบันการเงินออกแบบ-จัดการผลิตภัณฑ์เงินฝาก สินเชื่อ และดิจิทัลแบงกิ้งได้เอง — รวมกับ Galileo แล้ว SoFi เป็นเจ้าของทั้งชั้นการชำระเงิน ชั้นบัญชีแกน และชั้นประสบการณ์ผู้ใช้ในตัวเอง"
        },
        {
          "label": "SoFiUSD stablecoin",
          "note": "เปิดตัวเดือนพฤษภาคม 2026 เป็น stablecoin (เหรียญดิจิทัลที่ผูกมูลค่า 1:1 กับดอลลาร์สหรัฐ) ตัวแรกที่ออกโดยธนาคารแห่งชาติสหรัฐฯ ให้สมาชิกเกือบ 15 ล้านคนซื้อ-ขาย-แลกได้ตรงในแอป รองรับทั้งบนเครือข่าย Ethereum และ Solana"
        },
        {
          "label": "Big Business Banking",
          "note": "บริการธนาคารสำหรับลูกค้าองค์กรที่รองรับทั้งเงินสกุลปกติและคริปโตในแพลตฟอร์มเดียว มีพันธมิตรเริ่มต้นอย่าง Cumberland, Bullish, BitGo, Fireblocks, Mastercard ต่อยอดจากใบอนุญาตธนาคารที่มีอยู่แล้ว"
        },
        {
          "label": "Peach Finance (เพิ่งควบรวม)",
          "note": "ซื้อกิจการ Peach Finance ผู้ให้บริการซอฟต์แวร์จัดการสินเชื่อ (loan servicing) เข้ามาเสริมฝั่ง Technology Platform เป็นดีลควบรวมกิจการที่ 3 ของปี 2026 ต่อจาก Composer และ PrimaryBid"
        }
      ],
      "marketSummary": "ตลาดธนาคารดิจิทัล/ฟินเทคผู้บริโภคในสหรัฐฯ ยังโตต่อเนื่อง SoFi มีสมาชิกแล้ว 15.8 ล้านคน (เพิ่มขึ้น 35% เทียบปีก่อน) เติบโตเร็วกว่าธนาคารดั้งเดิมมากเพราะไม่มีข้อจำกัดสาขา ต้นทุนต่ำกว่า และใช้โมเดลครอสเซลจากสมาชิกเดิม\n\nคู่แข่งกระจายตามกลุ่มผลิตภัณฑ์: กลุ่ม BNPL/สินเชื่อดิจิทัลมี Affirm และ Upstart เป็นคู่แข่งตรง กลุ่ม neobank (ธนาคารไร้สาขา) มี Chime เป็นคู่แข่งฝั่งบัญชีเงินฝาก ส่วนตลาด LatAm มี Nu Holdings ที่ใหญ่กว่ามากในแง่จำนวนลูกค้าแต่คนละภูมิภาค — จุดที่ SoFi ต่างจากคู่แข่งฟินเทคส่วนใหญ่คือมีใบอนุญาตธนาคารเป็นของตัวเอง ทำให้แข่งขันด้านต้นทุนเงินทุนได้ดีกว่า",
      "competitors": [
        {
          "name": "Affirm",
          "strength": "แบรนด์ BNPL (ซื้อก่อนผ่อนทีหลัง) แข็งแกร่ง มีพันธมิตรร้านค้าปลีกจำนวนมาก",
          "weakness": "ไม่มีใบอนุญาตธนาคาร ผลิตภัณฑ์แคบกว่า SoFi ที่เป็นธนาคารเต็มรูปแบบ"
        },
        {
          "name": "Upstart",
          "strength": "เทคโนโลยี AI ประเมินสินเชื่อ (underwriting) ที่พัฒนามานาน ขายเป็นโมเดลให้ธนาคารอื่นใช้ต่อ",
          "weakness": "ไม่มีเงินฝากของตัวเองมาปล่อยกู้ ต้องพึ่งพาธนาคารพันธมิตร ทำให้ต้นทุนเงินทุนสู้ SoFi ไม่ได้"
        },
        {
          "name": "Chime",
          "strength": "ฐานผู้ใช้ neobank ขนาดใหญ่มาก ต้นทุนหาลูกค้าต่ำ",
          "weakness": "ไม่มีใบอนุญาตธนาคารเป็นของตัวเอง รายได้พึ่งค่าธรรมเนียมเครือข่ายบัตร (interchange) เป็นหลัก ผลิตภัณฑ์แคบกว่า"
        },
        {
          "name": "Nu Holdings",
          "strength": "ฐานลูกค้าใหญ่กว่ามาก (ราว 135 ล้านราย) ในตลาดลาตินอเมริกา",
          "weakness": "เน้นตลาดบราซิล-เม็กซิโก-โคลอมเบีย ไม่ใช่คู่แข่งตรงในตลาดสหรัฐฯ ที่ SoFi อยู่"
        }
      ],
      "financialsSummary": "ไตรมาส 2 ปี 2026 (Q2 2026) SoFi ทำรายได้ปรับปรุง (adjusted net revenue) เป็นสถิติใหม่ที่ 1.21 พันล้านดอลลาร์ โต 40% เทียบปีก่อน กำไรสุทธิตามบัญชี (GAAP net income) 156.6 ล้านดอลลาร์ โต 61% กำไรก่อนหักดอกเบี้ย-ภาษี-ค่าเสื่อม-ตัดจำหน่ายปรับปรุง (adjusted EBITDA) 357.8 ล้านดอลลาร์ ที่มาร์จิ้น 30%\n\nแนวโน้มรายได้ต่อไตรมาสยังโตต่อเนื่องชัดเจนตลอด 4 ไตรมาสล่าสุด และบริษัทเพิ่งปรับเป้าปีทั้งปี 2026 ขึ้น เป็นรายได้ปรับปรุง 4.75-4.85 พันล้านดอลลาร์ (โต 32-35%) พร้อมเป้ากำไรสุทธิปรับปรุงราว 825 ล้านดอลลาร์ และ EPS ปรับปรุงราว 0.60 ดอลลาร์\n\nอย่างไรก็ตาม ราคาหุ้นกลับปรับตัวลงหลังประกาศงบทั้งที่ผลประกอบการดีกว่าคาด สะท้อนว่านักลงทุนบางส่วนกังวลเรื่องคุณภาพสินเชื่อและการที่บริษัทไม่ได้ปรับเป้ามาร์จิ้น EBITDA ขึ้นตามรายได้ที่โต",
      "financialMetrics": [
        {
          "label": "Adjusted Net Revenue (Q2 2026)",
          "value": "$1.21B",
          "note": "+40% YoY, สถิติใหม่"
        },
        {
          "label": "GAAP Net Income (Q2 2026)",
          "value": "$156.6M",
          "note": "+61% YoY"
        },
        {
          "label": "Adjusted EBITDA (Q2 2026)",
          "value": "$357.8M",
          "note": "มาร์จิ้น 30%"
        },
        {
          "label": "Total Members",
          "value": "15.8 ล้านคน",
          "note": "+35% YoY"
        },
        {
          "label": "Loan Originations (Q2 2026)",
          "value": "$14.8B",
          "note": "+69% YoY"
        },
        {
          "label": "Market Cap",
          "value": "~$21.65B",
          "note": "ข้อมูล ณ 28 ก.ค. 2026"
        },
        {
          "label": "FY2026 Revenue Guidance",
          "value": "$4.75B–$4.85B",
          "note": "ปรับขึ้นจากเดิม ~$4.655B"
        }
      ],
      "financialTrend": [
        {
          "label": "Q3'25",
          "value": 950
        },
        {
          "label": "Q4'25",
          "value": 1013
        },
        {
          "label": "Q1'26",
          "value": 1087
        },
        {
          "label": "Q2'26",
          "value": 1206
        }
      ],
      "leadership": [
        {
          "name": "Anthony Noto",
          "role": "CEO",
          "note": "อดีตผู้บริหาร Twitter และ Goldman Sachs เข้ามาเป็น CEO ตั้งแต่ปี 2018 ผู้อยู่เบื้องหลังการเปลี่ยน SoFi จากบริษัทรีไฟแนนซ์สินเชื่อนักเรียนให้กลายเป็นแพลตฟอร์มธนาคารดิจิทัลครบวงจร ถือหุ้นส่วนตัวกว่า 11.6 ล้านหุ้น"
        },
        {
          "name": "Chris Lapointe",
          "role": "CFO",
          "note": "ดูแลด้านการเงิน เป็นผู้ตอบคำถามหลักเรื่องแผนการลงทุน/มาร์จิ้นในที่ประชุมนักวิเคราะห์"
        },
        {
          "name": "Tom Hutton",
          "role": "Independent Chairman",
          "note": "ประธานกรรมการอิสระของบริษัท"
        }
      ],
      "investors": [
        "Vanguard Group",
        "BlackRock",
        "SoftBank",
        "Qatar Investment Authority",
        "Silver Lake",
        "Social Capital (ผู้นำ SPAC ตอน IPO ปี 2021)"
      ],
      "catalysts": [
        {
          "label": "ขยาย SoFiUSD stablecoin",
          "note": "ต่อยอดจากฐานสมาชิก 15 ล้านคนที่มีอยู่แล้ว เป็นช่องทางรายได้ใหม่จากธุรกรรมคริปโตที่กำกับดูแลถูกกฎหมาย"
        },
        {
          "label": "Big Business Banking เจาะลูกค้าองค์กร",
          "note": "มีพันธมิตรตั้งต้นระดับสถาบัน (Mastercard, Fireblocks, BitGo ฯลฯ) เปิดตลาดใหม่ที่ไม่ใช่ผู้บริโภครายย่อย"
        },
        {
          "label": "ควบรวม Peach Finance เสริม Technology Platform",
          "note": "เพิ่มความสามารถด้านซอฟต์แวร์จัดการสินเชื่อ ต่อยอดรายได้ B2B จาก Galileo/Technisys"
        },
        {
          "label": "ปรับเป้ารายได้ทั้งปีขึ้นต่อเนื่อง",
          "note": "สะท้อนความมั่นใจของผู้บริหารต่อโมเมนตัมธุรกิจ แม้ราคาหุ้นตอบสนองลบในช่วงสั้น"
        }
      ],
      "risks": [
        {
          "label": "คุณภาพสินเชื่อพอร์ตส่วนบุคคล",
          "note": "พอร์ตสินเชื่อส่วนบุคคลแบบไม่มีหลักประกัน (unsecured) มูลค่าราว 1.5 หมื่นล้านดอลลาร์ อ่อนไหวต่ออัตราว่างงาน หากเศรษฐกิจสหรัฐฯ ชะลอตัวปลายปี 2026 อาจเห็นหนี้เสียเพิ่มขึ้น"
        },
        {
          "label": "แรงกดดันกำกับดูแล",
          "note": "สถานะธนาคารที่มีใบอนุญาตแห่งชาติทำให้ต้องอยู่ภายใต้การกำกับดูแลที่เข้มงวดกว่าฟินเทคทั่วไป และบริการ stablecoin/คริปโตยังเป็นพื้นที่กฎเกณฑ์ที่เปลี่ยนแปลงได้ตลอด"
        },
        {
          "label": "ถูกสอบสวนจาก short-seller",
          "note": "ช่วงปลายพฤษภาคม-มิถุนายน 2026 เจอการสอบสวนแบบ class-action จากข้อกล่าวหาของนักลงทุนขาย short เกี่ยวกับความถูกต้องของการรายงานผลประกอบการ"
        },
        {
          "label": "นักวิเคราะห์ปรับประมาณการลงต่อเนื่อง",
          "note": "ในช่วง 90 วันก่อนประกาศงบ มีการปรับประมาณการ EPS ลง 6 ครั้งและไม่มีปรับขึ้นเลยแม้ผลจริงจะออกมาดีกว่าคาด สะท้อนความระมัดระวังของตลาดต่อความยั่งยืนของอัตราเติบโตนี้"
        },
        {
          "label": "แข่งขันสูงในหลายผลิตภัณฑ์พร้อมกัน",
          "note": "ต้องสู้กับคู่แข่งเฉพาะทางในแต่ละผลิตภัณฑ์ (Affirm ด้าน BNPL, Chime ด้านบัญชีเงินฝาก, Upstart ด้าน AI underwriting) พร้อมกันหลายด้าน"
        }
      ],
      "discussion": [
        "Bull case: ทำ Rule of 40 (เกณฑ์รวมอัตราการเติบโตของรายได้กับมาร์จิ้นกำไรต้องรวมกันได้อย่างน้อย 40) ติดต่อกันมา 19 ไตรมาสแล้ว สะท้อนว่าโมเดลธุรกิจที่ผสมสินเชื่อ+บริการการเงิน+แพลตฟอร์มเทคโนโลยีเข้าด้วยกันทำงานได้จริง ไม่ใช่แค่เติบโตแบบเผาเงินสด",
        "Bear case: ราคาหุ้นร่วงทันทีหลังประกาศงบทั้งที่ผลประกอบการดีกว่าคาดทุกตัวเลข เป็นสัญญาณว่าตลาดอาจกำลังกังวลเรื่องคุณภาพสินเชื่อหรือความยั่งยืนของอัตราเติบโต 40% มากกว่าที่ตัวเลขไตรมาสนี้จะบอกได้",
        "ถ้าเศรษฐกิจสหรัฐฯ เข้าสู่ภาวะชะลอตัวจริงในช่วงปลายปี 2026 พอร์ตสินเชื่อส่วนบุคคลไม่มีหลักประกันของ SoFi จะกระทบมากแค่ไหน เทียบกับธนาคารดั้งเดิมที่มีพอร์ตกระจายกว่า",
        "การขยายเข้าสู่ stablecoin และ Big Business Banking (ธุรกิจคริปโตสำหรับองค์กร) จะกลายเป็นเครื่องยนต์การเติบโตใหม่ที่คุ้มกับความเสี่ยงด้านกฎเกณฑ์ที่เพิ่มขึ้น หรือจะเป็นจุดที่ทำให้ผู้กำกับดูแลจับตามากขึ้นจนกระทบธุรกิจหลักไปด้วย"
      ],
      "caveats": "ข้อมูลนี้จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ไม่ใช่คำแนะนำการลงทุน ตัวเลขและสถานการณ์บริษัทอ้างอิงข้อมูลสาธารณะ ณ วันที่ 30 กรกฎาคม 2026 (ผลประกอบการ Q2 2026 ประกาศเมื่อ 29 กรกฎาคม 2026) ราคาหุ้น มูลค่าตลาด และตัวเลขคาดการณ์เปลี่ยนแปลงได้ตลอดเวลา"
    }
  ]
};
window.INVESTMENT_UPDATED = "30/07/2026";
