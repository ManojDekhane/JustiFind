const mythFactDescriptionData = new Map([
  [
    "constitution-grants-rights",
    {
      title: "Constitution Grants Rights",
      myth: "The Constitution gives us our rights.",
      fact: "Our rights exist naturally; the Constitution only recognizes and protects them, it doesn’t create them.",
      description:
        "Many believe the Constitution 'gives' us rights, but in reality, it only guarantees and protects rights that people already have as part of being free citizens. The Constitution limits government power and ensures that these rights cannot be taken away easily.",
    },
  ],
  [
    "president-holds-supreme-power",
    {
      title: "President Holds Supreme Power",
      myth: "The President has ultimate authority over the nation.",
      fact: "India follows a parliamentary system where real power lies with the Council of Ministers led by the Prime Minister.",
      description:
        "While the President is India’s constitutional head, most powers are exercised on the advice of the Prime Minister and the Cabinet. The President’s role is largely ceremonial, ensuring decisions follow the Constitution rather than personal authority.",
    },
  ],
  [
    "constitution-unchangeable",
    {
      title: "Constitution Is Unchangeable",
      myth: "The Constitution cannot be changed or amended.",
      fact: "The Constitution can be amended under Article 368 by Parliament to meet changing needs of society.",
      description:
        "The Indian Constitution is flexible and allows amendments so it can evolve with time. This helps the government adapt to new challenges while maintaining democratic values and protecting citizens’ rights.",
    },
  ],
  [
    "fundamental-rights-unlimited",
    {
      title: "Fundamental Rights Are Unlimited",
      myth: "Fundamental Rights can be used without any restriction.",
      fact: "Fundamental Rights are subject to reasonable restrictions to protect public order, morality, and national interest.",
      description:
        "Rights like free speech and movement come with limits to ensure harmony and security. For example, speech that promotes violence or hatred can be restricted under law. This balance helps protect both freedom and public welfare.",
    },
  ],
  [
    "only-citizens-have-rights",
    {
      title: "Only Citizens Have Rights",
      myth: "Only Indian citizens enjoy legal rights under the Constitution.",
      fact: "Many rights, such as the right to equality and life, are available to all persons, not just citizens.",
      description:
        "While some rights like voting are for citizens only, others — such as the right to life and protection from discrimination — apply to everyone within India’s territory, including foreigners. This reflects India’s commitment to human rights.",
    },
  ],
  [
    "constitution-defines-govt-powers",
    {
      title: "Constitution Defines Only Government Powers",
      myth: "The Constitution only sets government powers and structure.",
      fact: "It also defines citizens’ rights, duties, and limits of government authority.",
      description:
        "The Constitution is not just about how the government functions; it’s a document that ensures accountability, balance of power, and protection of individual freedoms. It guides both citizens and the state in maintaining democracy.",
    },
  ],
  [
    "constitution-is-just-a-legal-paper",
    {
      title: "Constitution Is Just a Legal Paper",
      myth: "The Constitution is merely a legal document with rules.",
      fact: "It’s a living document that shapes India’s democracy, values, and governance.",
      description:
        "The Constitution goes beyond legal text — it reflects India’s history, freedom struggle, and vision for justice and equality. It’s interpreted and applied dynamically to meet the nation’s evolving social and political needs.",
    },
  ],
   [
    "police-can-arrest-anyone",
    {
      title: "Police Can Arrest Anyone",
      myth: "Police can arrest anyone anytime without reason.",
      fact: "Arrests require legal grounds and due procedure under law.",
      description:
        "Police must have valid reasons and follow lawful procedures before arresting someone — arbitrary arrests are punishable under Indian law.",
    },
  ],
  [
    "accused-means-guilty",
    {
      title: "Accused Means Guilty",
      myth: "If someone is accused, they are automatically guilty.",
      fact: "Everyone is presumed innocent until proven guilty in court.",
      description:
        "Being accused doesn’t mean guilt. The justice system ensures fair trial and evidence-based judgment before declaring anyone guilty.",
    },
  ],
  [
    "bail-avoids-punishment",
    {
      title: "Bail Avoids Punishment",
      myth: "Getting bail means escaping punishment.",
      fact: "Bail is a temporary release until trial, not freedom from law.",
      description:
        "Bail protects the accused’s liberty during trial but doesn’t affect the outcome. If found guilty, punishment still applies.",
    },
  ],
  [
    "minors-are-not-punished",
    {
      title: "Minors Are Not Punished",
      myth: "Children committing crimes face no punishment.",
      fact: "Juveniles are held accountable under special juvenile laws.",
      description:
        "Minors are tried under the Juvenile Justice Act, focusing on rehabilitation rather than punishment, depending on the nature of the crime.",
    },
  ],
  [
    "only-men-face-charges",
    {
      title: "Only Men Face Charges",
      myth: "Criminal laws apply only to men.",
      fact: "Anyone, regardless of gender, can be charged for crimes.",
      description:
        "Indian criminal law applies equally to all individuals — men, women, or others — ensuring equality before the law.",
    },
  ],
  [
    "self-defense-is-illegal",
    {
      title: "Self-Defense Is Illegal",
      myth: "Defending yourself or others is a punishable act.",
      fact: "Law protects the right to act in self-defense under certain limits.",
      description:
        "Sections 96–106 of the IPC allow self-defense against harm or unlawful attacks, as long as it’s reasonable and proportionate.",
    },
  ],
  [
  "civil-cases-are-about-money",
  {
    title: "Civil Cases Are About Money",
    myth: "Civil cases are only about financial disputes or compensation.",
    fact: "Civil law also deals with rights, property, family, and personal matters beyond money.",
    description:
      "Civil law covers a wide range of issues such as property ownership, family disputes, contracts, and inheritance. It’s not limited to financial compensation but ensures fair treatment and protection of individual rights.",
  },
],
[
  "winning-ends-dispute",
  {
    title: "Winning Ends Dispute",
    myth: "Winning a civil case permanently ends the dispute.",
    fact: "Even after judgment, cases can continue through appeals or enforcement issues.",
    description:
      "Winning a civil case doesn’t always mean the end. The losing party can appeal to a higher court, or enforcement of the court’s order can take time. True resolution often requires compliance and mutual understanding.",
  },
],
[
  "cases-give-quick-results",
  {
    title: "Cases Give Quick Results",
    myth: "Filing a civil case ensures a quick judgment.",
    fact: "Civil cases can take time due to evidence, procedure, and appeals.",
    description:
      "Civil court proceedings involve multiple stages — filing, evidence, arguments, and sometimes mediation. The goal is fairness, not speed, so cases may take longer to ensure justice for both sides.",
  },
],
[
  "settlement-means-guilt",
  {
    title: "Settlement Means Guilt",
    myth: "Agreeing to settle a case out of court means admitting guilt.",
    fact: "Settlements are often practical agreements to save time, money, and stress.",
    description:
      "Out-of-court settlements don’t mean guilt. Many parties choose settlement to resolve issues faster and avoid lengthy legal battles, without any formal admission of fault.",
  },
],
[
  "cant-win-against-companies",
  {
    title: "Can’t Win Against Companies",
    myth: "Ordinary people cannot win cases against large corporations.",
    fact: "Courts treat all parties equally under the law, regardless of status or size.",
    description:
      "The Indian judiciary ensures fairness and equality before the law. Consumer protection and civil rights laws empower individuals to challenge even big companies through proper legal procedures.",
  },
],
[
  "can-file-anytime",
  {
    title: "Can File Anytime",
    myth: "Anyone can file a civil case whenever they want.",
    fact: "Every case must be filed within a specific time limit known as the limitation period.",
    description:
      "The Limitation Act sets deadlines for filing cases depending on the dispute type. Missing this time limit can result in dismissal, ensuring legal certainty and timely justice.",
  },
],
[
  "only-rich-afford-cases",
  {
    title: "Only Rich Afford Cases",
    myth: "Filing or fighting civil cases is only for the wealthy.",
    fact: "Legal aid and public interest litigation make justice accessible to all citizens.",
    description:
      "The Legal Services Authorities Act provides free legal aid to people with limited means. Civil cases can also be handled through Lok Adalats or mediation, reducing costs and delays.",
  },
],
[
  "wills-for-wealthy-only",
  {
    title: "Wills for Wealthy Only",
    myth: "Only rich people need to write wills.",
    fact: "A will is important for anyone who owns property, savings, or belongings.",
    description:
      "Writing a will ensures that your assets are distributed as per your wishes after death, regardless of wealth. It prevents family disputes and provides legal clarity on inheritance.",
  },
],
[
  "lawyers-twist-law",
  {
    title: "Lawyers Twist Law",
    myth: "Lawyers manipulate legal loopholes to win cases.",
    fact: "Lawyers represent clients within ethical and legal boundaries.",
    description:
      "Lawyers are bound by the Bar Council of India’s code of conduct to uphold justice. Their duty is to defend clients’ rights fairly and honestly while respecting the court’s integrity.",
  },
],
[
  "admins-have-unlimited-power",
  {
    title: "Admins Have Unlimited Power",
    myth: "Administrative authorities can use power without limits.",
    fact: "Their powers are restricted by law and subject to judicial review.",
    description:
      "Administrative authorities must act within legal limits. Courts can review and strike down actions that exceed or misuse power.",
  },
],
[
  "govt-decisions-cant-be-challenged",
  {
    title: "Govt Decisions Can’t Be Challenged",
    myth: "Decisions made by government officials are final and unquestionable.",
    fact: "Any arbitrary or unlawful decision can be challenged in court.",
    description:
      "Judicial review ensures citizens can challenge administrative decisions violating rights or exceeding authority.",
  },
],
[
  "admin-law-for-employees-only",
  {
    title: "Admin Law for Employees Only",
    myth: "Administrative law applies only to government employees.",
    fact: "It governs all government actions affecting citizens.",
    description:
      "Administrative law regulates the relationship between public authorities and citizens, not just employees.",
  },
],
[
  "no-remedy-for-power-misuse",
  {
    title: "No Remedy for Power Misuse",
    myth: "Citizens can’t take action against misuse of power by authorities.",
    fact: "Courts offer remedies like writs against abuse of power.",
    description:
      "Citizens can approach courts for relief under Articles 32 and 226 of the Constitution to challenge arbitrary government actions.",
  },
],
[
  "not-part-of-constitutional-law",
  {
    title: "Not Part of Constitutional Law",
    myth: "Administrative law is completely separate from constitutional law.",
    fact: "It draws its foundation and authority from constitutional principles.",
    description:
      "Administrative law operates under the Constitution, ensuring that government actions align with constitutional rights and limits.",
  },
],
[
  "admin-actions-are-final",
  {
    title: "Admin Actions Are Final",
    myth: "Administrative decisions are conclusive and cannot be reviewed.",
    fact: "Courts can review administrative actions for fairness and legality.",
    description:
      "The judiciary has the power to review administrative actions to prevent injustice, bias, or violation of legal principles.",
  },
],
[
  "only-about-rules-and-procedures",
  {
    title: "Only About Rules and Procedures",
    myth: "Administrative law only covers rules, forms, and paperwork.",
    fact: "It ensures fairness, accountability, and transparency in governance.",
    description:
      "Administrative law protects citizens’ rights by ensuring government bodies follow just and reasonable procedures.",
  },
],
[
  "weakens-government-efficiency",
  {
    title: "Weakens Government Efficiency",
    myth: "Administrative law slows down and weakens governance.",
    fact: "It improves efficiency through accountability and checks on power.",
    description:
      "By promoting transparency and fairness, administrative law strengthens good governance and public trust.",
  },
],
  // Family Law
  [
    "divorce-ends-all-ties",
    {
      title: "Divorce Ends All Family Ties",
      myth: "Divorce ends all family relationships.",
      fact: "Divorce only ends the marriage, not parental or familial bonds.",
      description: "Even after divorce, relationships like parent–child continue under law.",
    },
  ],
  [
    "mothers-always-get-custody",
    {
      title: "Mothers Always Get Custody",
      myth: "Mothers always get child custody after divorce.",
      fact: "Custody depends on the child’s best interest, not gender.",
      description: "Courts consider welfare and stability, giving custody to either parent.",
    },
  ],
  [
    "only-married-couples-get-maintenance",
    {
      title: "Only Married Couples Get Maintenance",
      myth: "Maintenance applies only to married couples.",
      fact: "Maintenance can be granted in some live-in and dependent relationships.",
      description: "Law supports dependents, not just legally wedded spouses.",
    },
  ],
  [
    "husband-owns-all-property",
    {
      title: "Husband Owns All Property",
      myth: "All property belongs to the husband after marriage.",
      fact: "Each spouse retains ownership of their own property.",
      description: "Marriage doesn’t transfer property rights automatically between partners.",
    },
  ],
  [
    "violence-means-only-physical",
    {
      title: "Domestic Violence Means Only Physical Abuse",
      myth: "Domestic violence is limited to physical harm.",
      fact: "It also includes emotional, sexual, and economic abuse.",
      description: "The Domestic Violence Act covers various forms of harm, not just physical.",
    },
  ],
  [
    "family-disputes-must-go-to-court",
    {
      title: "Family Disputes Must Go to Court",
      myth: "All family disputes must be settled in court.",
      fact: "Mediation and family counseling are also legal options.",
      description: "Alternative dispute resolution promotes faster, amicable settlements.",
    },
  ],
  [
    "men-cant-be-victims",
    {
      title: "Men Can’t Be Victims of Domestic Violence",
      myth: "Only women can face domestic violence.",
      fact: "Men too can be victims and seek protection under law.",
      description: "Awareness is growing about male victims in domestic abuse cases.",
    },
  ],
  [
    "religion-doesnt-affect-family-law",
    {
      title: "Religion Doesn’t Affect Family Law",
      myth: "Religion plays no role in family law.",
      fact: "Personal laws vary by religion in matters like marriage and inheritance.",
      description: "Hindu, Muslim, Christian, and other communities have distinct family laws.",
    },
  ],
  [
    "only-childless-can-adopt",
    {
      title: "Only Childless Couples Can Adopt",
      myth: "Only couples without children can adopt.",
      fact: "Anyone meeting legal criteria can adopt, even those with children.",
      description: "Adoption laws focus on the child’s welfare, not parental status.",
    },
  ],
  [
    "family-law-only-divorce",
    {
      title: "Family Law Is Only About Divorce",
      myth: "Family law deals only with divorce cases.",
      fact: "It covers marriage, maintenance, adoption, custody, and inheritance too.",
      description: "Family law governs all personal and domestic legal relations.",
    },
  ],

  // Contract & Commercial Law
  [
    "only-written-contracts-valid",
    {
      title: "Only Written Contracts Are Valid",
      myth: "Contracts must be in writing to be legal.",
      fact: "Verbal contracts can be legally binding too.",
      description: "What matters is mutual consent and lawful consideration, not form.",
    },
  ],
  [
    "verbal-deals-invalid",
    {
      title: "Verbal Deals Have No Legal Value",
      myth: "Oral agreements don’t count as contracts.",
      fact: "If proven, verbal agreements are enforceable by law.",
      description: "Evidence like witnesses can validate verbal contracts.",
    },
  ],
  [
    "signed-contracts-unchangeable",
    {
      title: "Signed Contracts Can’t Be Changed",
      myth: "Once signed, a contract is final.",
      fact: "Contracts can be modified by mutual consent.",
      description: "Addendums or amendments legally update existing contracts.",
    },
  ],
  [
    "cannot-cancel-contract",
    {
      title: "You Can’t Cancel a Signed Contract",
      myth: "Contracts can’t be revoked after signing.",
      fact: "Contracts can be terminated for valid reasons like fraud or breach.",
      description: "Law provides remedies for rescission and cancellation.",
    },
  ],
  [
    "terms-dont-matter",
    {
      title: "Terms and Conditions Don’t Matter",
      myth: "Reading terms isn’t necessary.",
      fact: "You’re bound by what you agree to—always read before signing.",
      description: "Ignoring terms can lead to legal and financial risk.",
    },
  ],
  [
    "only-lawyers-make-contracts",
    {
      title: "Only Lawyers Can Create Contracts",
      myth: "Contracts made without lawyers are invalid.",
      fact: "Anyone can make a valid contract if legal essentials are met.",
      description: "Legal assistance helps, but isn’t mandatory for validity.",
    },
  ],
  [
    "unstamped-contract-invalid",
    {
      title: "Unstamped or Unnotarized Contracts Are Invalid",
      myth: "Contracts must be notarized to be legal.",
      fact: "Stamping/notarization adds proof, but the contract itself can still be valid.",
      description: "Legal validity depends on offer, acceptance, and consideration.",
    },
  ],

  // Property Law
  [
    "unregistered-property-valid",
    {
      title: "Unregistered Property Is Valid",
      myth: "Property ownership is valid without registration.",
      fact: "Registration is mandatory for legal ownership transfer.",
      description: "Unregistered property can’t be legally enforced in court.",
    },
  ],
  [
    "payment-makes-owner",
    {
      title: "Full Payment Makes You the Owner",
      myth: "Paying full price gives ownership.",
      fact: "Ownership transfers only through a registered sale deed.",
      description: "Payment alone doesn’t prove ownership under law.",
    },
  ],
  [
    "notarized-equals-registered",
    {
      title: "Notarized Papers Equal Registered Deed",
      myth: "Notarized agreements are legally the same as registered ones.",
      fact: "Registration provides legal validity; notarization does not.",
      description: "Registered deeds are essential for property rights.",
    },
  ],
  [
    "only-men-own-property",
    {
      title: "Only Men Can Own Property",
      myth: "Women can’t inherit or own land.",
      fact: "Both men and women have equal property rights.",
      description: "Gender equality in inheritance is protected by law.",
    },
  ],
  [
    "verbal-property-deal-legal",
    {
      title: "Verbal Property Deals Are Legal",
      myth: "Property can be transferred orally.",
      fact: "Written and registered documentation is legally required.",
      description: "Verbal transfers have no standing in property law.",
    },
  ],
  [
    "ancestral-cant-be-sold",
    {
      title: "Ancestral Land Can’t Be Sold",
      myth: "Inherited property can’t be sold by heirs.",
      fact: "Ancestral property can be sold with all co-owners’ consent.",
      description: "Sale depends on ownership share and agreement.",
    },
  ],
  [
    "seller-no-duty-after-sale",
    {
      title: "Seller Has No Duty After Sale",
      myth: "Sellers have no responsibility once property is sold.",
      fact: "Sellers must ensure clear title and lawful transfer.",
      description: "Hidden defects or fraud can make sellers liable.",
    },
  ],
  [
    "tenant-cant-own-property",
    {
      title: "Tenants Can’t Ever Own Property",
      myth: "Tenants can never gain ownership rights.",
      fact: "Tenants may acquire rights under adverse possession or laws.",
      description: "Long-term possession may give tenants limited ownership claims.",
    },
  ],

  // Labour & Industrial Law
  [
    "laws-protect-only-workers",
    {
      title: "Labour Laws Protect Only Workers",
      myth: "Labour laws favor workers alone.",
      fact: "They balance rights of both employers and employees.",
      description: "Industrial laws ensure fair treatment and cooperation.",
    },
  ],
  [
    "only-permanent-covered",
    {
      title: "Only Permanent Staff Are Covered",
      myth: "Labour laws apply only to permanent workers.",
      fact: "Contract and temporary employees are also protected.",
      description: "Labour rights extend to all categories of workers.",
    },
  ],
  [
    "same-minimum-wage-everywhere",
    {
      title: "Minimum Wage Is Same Everywhere",
      myth: "Minimum wages are uniform across India.",
      fact: "Rates vary by state, skill, and industry.",
      description: "Wages are fixed regionally by government notifications.",
    },
  ],
  [
    "employers-can-fire-anytime",
    {
      title: "Employers Can Fire Without Reason",
      myth: "Employers can dismiss workers freely.",
      fact: "Termination must follow legal notice and valid cause.",
      description: "Unfair dismissal can lead to reinstatement or compensation.",
    },
  ],
  [
    "women-cant-work-night",
    {
      title: "Women Can’t Work at Night",
      myth: "Women can’t work in factories or night shifts.",
      fact: "Women can work nights with safety provisions in place.",
      description: "Labour laws ensure safety, not restriction, for women workers.",
    },
  ],
  [
    "unions-cause-conflicts",
    {
      title: "Unions Only Cause Conflicts",
      myth: "Labour unions always create tension.",
      fact: "Unions promote fair negotiation and worker protection.",
      description: "Strong unions help maintain industrial harmony.",
    },
  ],
  [
    "employers-not-liable-safety",
    {
      title: "Employers Aren’t Liable for Safety",
      myth: "Employers bear no responsibility for worker safety.",
      fact: "They’re legally bound to ensure a safe workplace.",
      description: "Safety laws mandate training, equipment, and preventive measures.",
    },
  ],
  [
    "employees-cant-sue-salary",
    {
      title: "Employees Can not Sue for Unpaid Salary",
      myth: "Workers can not take legal action for unpaid wages.",
      fact: "Employees can file complaints under labour laws for recovery.",
      description: "Wage protection acts safeguard timely and full payment.",
    }
  ],
  // ✅ Environmental Law
  [
    "environmental-law-applies-only-to-factories",
    {
      title: "Environmental Law Applies Only to Factories",
      myth: "Environmental laws apply only to factories and industries.",
      fact: "They apply to individuals, businesses, and public projects alike.",
      description: "Environmental protection laws cover all forms of human activity that impact nature, not just industrial operations.",
    },
  ],
  [
    "individuals-not-responsible-environment",
    {
      title: "Individuals Aren’t Responsible for Environmental Harm",
      myth: "Only industries can be punished for environmental damage.",
      fact: "Individuals can also be held liable for polluting or harming the environment.",
      description: "Actions like illegal dumping, burning waste, or cutting trees without permission can attract penalties under law.",
    },
  ],
  [
    "minor-pollution-not-illegal",
    {
      title: "Minor Pollution Isn’t Illegal",
      myth: "Cutting a few trees or minor pollution doesn’t matter legally.",
      fact: "Every act causing environmental damage can invite legal action.",
      description: "Even small-scale violations are punishable under environmental acts like the EPA and Forest Conservation laws.",
    },
  ],
  [
    "environmental-clearance-formality",
    {
      title: "Environmental Clearance Is Just a Formality",
      myth: "Clearances are symbolic and have no real effect.",
      fact: "They are mandatory safeguards ensuring sustainable project execution.",
      description: "Environmental Impact Assessments and clearances prevent large-scale harm to ecosystems and local communities.",
    },
  ],
  [
    "only-government-protects-environment",
    {
      title: "Only the Government Must Protect the Environment",
      myth: "Environmental protection is solely the government’s duty.",
      fact: "Every citizen has a constitutional duty to protect the environment.",
      description: "Article 51A(g) of the Constitution makes environmental care a fundamental duty for all citizens.",
    },
  ],
  [
    "businesses-can-pollute-if-pay-fines",
    {
      title: "Businesses Can Pollute If They Pay Fines",
      myth: "Companies can continue polluting by just paying penalties.",
      fact: "Paying fines doesn’t legalize environmental damage.",
      description: "Repeated violations can lead to shutdowns, license cancellations, or imprisonment under environmental laws.",
    },
  ],
  [
    "environmental-law-only-pollution",
    {
      title: "Environmental Law Covers Only Pollution",
      myth: "Environmental law deals only with air and water pollution.",
      fact: "It also protects forests, wildlife, and biodiversity.",
      description: "Environmental laws govern conservation of ecosystems, species protection, and sustainable land use.",
    },
  ],
  [
    "environmental-cases-take-too-long",
    {
      title: "Environmental Cases Take Too Long",
      myth: "Environmental litigation takes years and has no impact.",
      fact: "Special green tribunals ensure speedy and effective resolution.",
      description: "The National Green Tribunal (NGT) was established for fast-track environmental justice in India.",
    },
  ],

  // ✅ Taxation Law
  [
    "taxation-law-only-salaried",
    {
      title: "Taxation Law Applies Only to Salaried People",
      myth: "Only salaried individuals need to pay taxes.",
      fact: "Anyone earning income above the threshold must pay tax.",
      description: "Self-employed persons, freelancers, and business owners are also covered under tax laws.",
    },
  ],
  [
    "no-return-if-income-below-limit",
    {
      title: "No Return Needed If Income Is Below Limit",
      myth: "People below taxable income need not file returns.",
      fact: "Filing returns is advised even if income is below limit.",
      description: "It helps maintain financial records and claim refunds or benefits later.",
    },
  ],
  [
    "gst-replaces-income-tax",
    {
      title: "Paying GST Replaces Income Tax",
      myth: "Paying GST means no need to pay income tax.",
      fact: "GST and income tax are separate legal obligations.",
      description: "GST applies to goods/services, while income tax applies to personal or business earnings.",
    },
  ],
  [
    "cash-transactions-untraceable",
    {
      title: "Cash Transactions Can’t Be Traced",
      myth: "Cash dealings escape tax department scrutiny.",
      fact: "Large or suspicious cash transactions are easily traceable.",
      description: "Banks and institutions report high-value cash movements to tax authorities.",
    },
  ],
  [
    "no-return-if-tds-deducted",
    {
      title: "Filing Return Isn’t Needed If TDS Deducted",
      myth: "Once TDS is cut, return filing is unnecessary.",
      fact: "Filing return is still required to reconcile taxes.",
      description: "Return filing ensures correct tax calculation and enables refund claims.",
    },
  ],
  [
    "tax-laws-affect-only-business",
    {
      title: "Tax Laws Affect Only Big Businesses",
      myth: "Only corporations are bound by tax laws.",
      fact: "Every earning citizen is responsible for taxation.",
      description: "Tax laws apply to individuals, professionals, and organizations alike.",
    },
  ],

  // ✅ Banking & Financial Law
  [
    "banks-can-use-customer-money",
    {
      title: "Banks Can Use Customers’ Money Freely",
      myth: "Banks can invest or use customer deposits however they want.",
      fact: "Banks are strictly regulated by the RBI.",
      description: "Deposits are used under RBI norms ensuring safety and accountability.",
    },
  ],
  [
    "all-deposits-fully-guaranteed",
    {
      title: "All Bank Deposits Are Fully Guaranteed",
      myth: "Government guarantees 100% of all deposits.",
      fact: "Only a limited amount per account is insured by law.",
      description: "The DICGC insures deposits up to ₹5 lakh per account holder per bank.",
    },
  ],
  [
    "loan-agreements-not-challenged",
    {
      title: "Loan Agreements Can’t Be Challenged",
      myth: "Loan terms are one-sided and final.",
      fact: "Unfair or unlawful clauses can be legally contested.",
      description: "Borrowers can seek redress through consumer or civil courts.",
    },
  ],
  [
    "financial-laws-protect-only-banks",
    {
      title: "Financial Laws Protect Only Banks",
      myth: "Financial regulations favor banks over customers.",
      fact: "They ensure protection for depositors and investors too.",
      description: "Acts like RBI Act and SEBI regulations safeguard public financial interests.",
    },
  ],
  [
    "stock-market-not-regulated",
    {
      title: "Stock Market Isn’t Regulated by Law",
      myth: "Share trading operates without legal oversight.",
      fact: "It’s strictly governed by SEBI and related laws.",
      description: "SEBI monitors fair trading, insider activity, and investor protection.",
    },
  ],

  // ✅ Consumer Protection Law
  [
    "consumer-law-only-physical-goods",
    {
      title: "Consumer Law Covers Only Physical Goods",
      myth: "Consumer protection applies only to physical products.",
      fact: "It covers online purchases and digital services too.",
      description: "The 2019 Act includes e-commerce platforms and digital transactions.",
    },
  ],
  [
    "small-defects-not-worth-complaint",
    {
      title: "Small Defects Aren’t Worth Complaining About",
      myth: "Minor issues don’t justify a complaint.",
      fact: "Consumers can file complaints for any valid loss or defect.",
      description: "Even small grievances are recognized under consumer rights law.",
    },
  ],
  [
    "sellers-not-liable-after-sale",
    {
      title: "Sellers Aren’t Liable After Sale",
      myth: "Responsibility ends once a product is sold.",
      fact: "Sellers remain accountable for defects or misleading claims.",
      description: "Post-sale liability includes warranty and service obligations.",
    },
  ],
  [
    "only-rich-or-educated-people-can-file-complaints",
    {
      title: "Only Rich or Educated People Can File Complaints",
      myth: "Consumer courts are meant for the privileged.",
      fact: "Anyone can file a complaint easily and affordably.",
      description: "Consumer forums are designed to be simple, accessible, and inexpensive.",
    },
  ],
  [
    "consumer-cases-always-take-years-to-finish",
    {
      title: "Consumer Cases Always Take Years",
      myth: "Consumer cases are slow and ineffective.",
      fact: "Most cases resolve within months through simplified procedures.",
      description: "Consumer commissions follow speedy redressal under the new act.",
    },
  ],
  [
    "banks-airlines-and-hospitals-are-not-covered-under-consumer-law",
    {
      title: "Banks Airlines and Hospitals Are not Covered Under Consumer Law",
      myth: "Service providers like banks or airlines are excluded.",
      fact: "All service providers fall under consumer protection law.",
      description: "The law includes sectors like healthcare, transport, finance, and telecom.",
    },
  ],

  // ✅ International Law
  [
    "international-law-does-not-affect-indian-laws",
    {
      title: "International Law Does not Affect Indian Laws",
      myth: "Indian domestic law operates separately from international law.",
      fact: "International agreements influence national laws and policies.",
      description: "India aligns domestic laws with treaty obligations when necessary.",
    },
  ],
  [
    "only-governments-deal-with-international-law",
    {
      title: "Only Governments Deal With International Law",
      myth: "Only diplomats handle international law matters.",
      fact: "Individuals and organizations are also affected by global rules.",
      description: "International trade, human rights, and environment laws impact citizens too.",
    },
  ],
  [
    "treaties-automatically-become-indian-law",
    {
      title: "Treaties Automatically Become Indian Law",
      myth: "Treaties signed by India instantly become enforceable.",
      fact: "They require parliamentary approval to become domestic law.",
      description: "International agreements are implemented through enabling Indian legislation.",
    },
  ],
  [
    "international-law-is-above-the-constitution",
    {
      title: "International law is above the Constitution",
      myth: "Global law overrides India Constitution.",
      fact: "The Constitution remains India supreme legal authority.",
      description: "International obligations must comply with constitutional provisions.",
    },
  ],
  [
    "individuals-are-not-affected-by-international-law-breaches",
    {
      title: "Individuals Are not Affected by International Law breaches",
      myth: "Only states are bound by international rules.",
      fact: "Individuals can benefit or be prosecuted under global laws.",
      description: "Human rights treaties and war crime laws directly apply to individuals.",
    },
  ],
  [
    "un-controls-indian-policy",
    {
      title: "un-controls-indian-policy",
      myth: "The United Nations can dictate Indias internal matters.",
      fact: "India remains sovereign and independent in decision-making.",
      description: "The UN role is advisory, not authoritative, over member nations.",
    },
  ],

]);

export default mythFactDescriptionData;