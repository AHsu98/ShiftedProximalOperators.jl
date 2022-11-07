var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Contents","page":"Reference","title":"Contents","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/#Index","page":"Reference","title":"Index","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [ShiftedProximalOperators]","category":"page"},{"location":"reference/#ShiftedProximalOperators.Cappedl1","page":"Reference","title":"ShiftedProximalOperators.Cappedl1","text":"Cappedl1(λ, θ)\n\nReturns the capped L1 approximation to the rank function\n\nf(x) =  lambda min(θ σ(X))\n\nfor nonnegative parameters lambda and theta, and a vector x, where x = textvec(X).\n\n\n\n\n\n","category":"type"},{"location":"reference/#ShiftedProximalOperators.GroupNormL2","page":"Reference","title":"ShiftedProximalOperators.GroupNormL2","text":"GroupNormL2(λ = 1, idx = [:])\n\nReturns the group ell_2-norm operator\n\nf(x) =  sum_i lambda_i x_i_2^12\n\nfor groups x_i and nonnegative weights lambda_i. The group ell_2-norm operator reduces to the ell_2-norm if only one group is defined (the default).\n\n\n\n\n\n","category":"type"},{"location":"reference/#ShiftedProximalOperators.Nuclearnorm","page":"Reference","title":"ShiftedProximalOperators.Nuclearnorm","text":"Nuclearnorm(λ)\n\nReturns the nuclear norm\n\nf(x) =  lambda X_*\n\nfor a nonnegative parameter lambda and a vector x, where x = textvec(X).\n\n\n\n\n\n","category":"type"},{"location":"reference/#ShiftedProximalOperators.Rank","page":"Reference","title":"ShiftedProximalOperators.Rank","text":"Rank(λ)\n\nReturns the rank\n\nf(x) =  lambda textrank(X)\n\nfor a nonnegative parameter lambda and a vector x, where x = textvec(X).\n\n\n\n\n\n","category":"type"},{"location":"reference/#ShiftedProximalOperators.RootNormLhalf","page":"Reference","title":"ShiftedProximalOperators.RootNormLhalf","text":"RootNormLhalf(λ=1)\n\nReturns the ell_12^12 pseudo-norm operator\n\nf(x) = λ sum x^12\n\nwhere lambda  0.\n\n\n\n\n\n","category":"type"},{"location":"reference/#ShiftedProximalOperators.ShiftedProximableFunction","page":"Reference","title":"ShiftedProximalOperators.ShiftedProximableFunction","text":"Abstract type for shifted proximable functions.\n\n\n\n\n\n","category":"type"},{"location":"reference/#ProximalCore.prox!","page":"Reference","title":"ProximalCore.prox!","text":"prox!(y, ψ, q, σ)\n\nEvaluate the proximal operator of a shifted regularizer, i.e, return a solution s of\n\nminimize{s}  ½ σ⁻¹ ‖s - q‖₂² + ψ(s),\n\nwhere\n\nψ is a ShiftedProximableFunction representing a model of h(x + s) and possibly including the indicator of a trust region;\nq is the vector where the shifted proximal operator should be evaluated;\nσ is a positive regularization parameter.\n\nThe solution is stored in the input vector y an y is returned.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ProximalCore.prox-Union{Tuple{V}, Tuple{R}, Tuple{ShiftedProximableFunction, V, R}} where {R<:Real, V<:AbstractVector{R}}","page":"Reference","title":"ProximalCore.prox","text":"prox(ψ, q, σ)\n\nSee the documentation of prox!. In this form, the solution is stored in ψ's internal storage and a reference is returned.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ShiftedProximalOperators.prox_zero-Union{Tuple{R}, Tuple{R, R, R}} where R<:Real","page":"Reference","title":"ShiftedProximalOperators.prox_zero","text":"prox_zero(q, l, u)\n\nReturn the solution of\n\nmin ½ σ⁻¹ (y - q)² subject to l ≤ y ≤ u\n\nfor any σ > 0. This problem occurs when computing the prox with respect to a separable nonsmooth term along a variable that is not part of those to which the nonsmooth term is applied.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ShiftedProximalOperators.set_bounds!-Tuple{ShiftedProximableFunction, Any, Any}","page":"Reference","title":"ShiftedProximalOperators.set_bounds!","text":"set_bounds!(ψ, l, u)\n\nSet the lower and upper bound of the box to l and u, respectively. l and u can be scalars or vectors.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ShiftedProximalOperators.set_radius!-Union{Tuple{R}, Tuple{ShiftedProximableFunction, R}} where R<:Real","page":"Reference","title":"ShiftedProximalOperators.set_radius!","text":"set_radius!(ψ, Δ)\n\nSet the trust-region radius of a shifted proximable function to Δ. This method updates the indicator of the trust region that is part of ψ.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ShiftedProximalOperators.shift!-Union{Tuple{R}, Tuple{ShiftedProximableFunction, AbstractVector{R}}} where R<:Real","page":"Reference","title":"ShiftedProximalOperators.shift!","text":"shift!(ψ, x)\n\nUpdate the shift of a shifted proximable function.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ShiftedProximalOperators.shifted","page":"Reference","title":"ShiftedProximalOperators.shifted","text":"shifted(h, x)\nshifted(h, x, Δ, ρ)\n\nConstruct a shifted proximable function from a proximable function or from another shifted proximable function.\n\nIf h is a ProximableFunction, including a ShiftedProximableFunction, the form shifted(h, x) returns a ShiftedProximableFunction ψ such that ψ(s) == h(x + s). Subsequently, prox may be called on ψ. The first form applies when h is a ShiftedProximableFunction and can be used to shift an already-shifted proximable function.\n\nThe form shifted(h, x, Δ, ρ) returns a ShiftedProximableFunction ψ such that ψ(s) == h(x + s) + Ind({‖s‖ ≤ Δ}), where Ind(.) represents the indicator of a set, in this case the indicator of a ball of radius Δ, in which the norm is defined by ρ.\n\nArguments\n\nh::ProximableFunction (including a ShiftedProximableFunction)\nx::AbstractVector\nΔ::Real\nρ::ProximableFunction.\n\nOnly certain combinations of h and ρ are supported; those for which the analytical form of the proximal operator is known.\n\nIf h is a shifted proximable function obtained from a previous call to shifted(), only the form shifted(h, x) is supported. If applicable, the resulting shifted proximable function is associated with the same Δ and ρ as h.\n\nSee the documentation of ProximalOperators.jl for more information.\n\n\n\n\n\n","category":"function"},{"location":"#ShiftedProximalOperators.jl","page":"Home","title":"ShiftedProximalOperators.jl","text":"","category":"section"},{"location":"tutorial/#ShiftedProximalOperators-Tutorial","page":"Tutorial","title":"ShiftedProximalOperators Tutorial","text":"","category":"section"}]
}
