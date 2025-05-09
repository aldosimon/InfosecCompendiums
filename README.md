# About
The infosec compendiums project aims to inventories topics of information security (e.g. tools, scripts, cheat sheets, knowledge bases, among other things)

The project started because from time to time I need access to a specific infosec project but can't remember its name to search.

So, the main goal of the project is to provide a one pager with an easy way to filter or search. The project accomplished this by providing “subject”, "object" and “predicate” columns to filter.

For instance if you are trying to find something that list/ explain various cloudtrail api calls, you’ll use filter "tool", "explain", "cloudTrail" in the "subject”, “predicate”, and “object” column respectively.

## Todo

create a schema so consistent wording especially throughout the SPO.


### Schema draft as of May 2025

#### Subject (What type of topic is it?)

This column aims to categorize the fundamental nature of the infosec topic.

***Tools***: Applications, programs, and scripts designed for specific security purposes.
Example: Firewall, Antivirus, Vulnerability Scanner, Intrusion Detection System (IDS), Security Information and Event Management (SIEM)

***Methodology**: Techniques, approaches, and procedures used in security practices.
Example: Penetration Testing, Threat Modeling, Risk Assessment, Incident Response, Social Engineering

***Concept***: Fundamental ideas, principles, and theories in information security.
Example: Confidentiality, Integrity, Availability (CIA Triad), Least Privilege, Defense in Depth, Zero Trust

***Standard***: Formalized documents outlining requirements, specifications, guidelines, or characteristics used to consistently ensure that materials, products, processes, and services are fit for their purpose. Example: ISO 27001, NIST Cybersecurity Framework, PCI DSS, HIPAA

***Data***: Information that is the subject of security efforts.
Example: Personally Identifiable Information (PII), Financial Data, Credentials, Logs, Encryption Keys

#### Predicate (What does that topic do?)

This column describes the action or function of the infosec topic.

***Manage***: To control, administer, and oversee something.
Example: Manage network connections, Manage user access, Manage security policies

***Protect***: To defend against threats and prevent unauthorized access, use, disclosure, disruption, 
modification, or destruction. Example: Protect data, Protect systems, Protect networks

***Detect***: To identify the presence of security-related events, threats, or vulnerabilities.
Example: Detect intrusions, Detect malware, Detect anomalies

***Analyze***: To examine information in detail, typically for purposes of explanation and interpretation.
Example: Analyze logs, Analyze malware, Analyze vulnerabilities

***Assess***: To evaluate the nature, ability, or quality of something.
Example: Assess risks, Assess security posture, Assess vulnerabilities

***Enforce***: To compel observance of or compliance with (a law, rule, or obligation).
Example: Enforce security policies, Enforce access controls

***Test***: To test.
Examples: Penetration testing frameworks, red team tools.

***Explain***: To explain, transmit or exchange security-related information.
Example: Communicate threats, Communicate alerts

***Recover***: To restore to a former or normal condition after loss, damage, or a security incident.
Example: Recover data, Recover systems

#### Object (To whom or what does that topic do something?)

This column specifies the target or beneficiary of the action described by the predicate.
It is more practical to avoid restricting the range of objects, as doing so would limit flexibility. Therefore, objects will remain unrestricted
